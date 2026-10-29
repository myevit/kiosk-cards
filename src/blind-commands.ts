import type { State } from './types.js';
export type BlindCommand =
  | { service: 'open_cover'; entity_id: string }
  | { service: 'close_cover'; entity_id: string }
  | { service: 'set_cover_position'; entity_id: string; position: number }
  | { service: 'set_cover_tilt_position'; entity_id: string; tilt_position: number };
export const nativeServices = ['open_cover', 'close_cover', 'set_cover_position', 'set_cover_tilt_position'] as const;
const object = (v: any) => v && typeof v === 'object' && !Array.isArray(v);
const keys = (v: any, allowed: string[]) => object(v) && Object.keys(v).every(k => allowed.includes(k));
export function validateCommands(value: unknown, entities: string[]): BlindCommand[] {
  if (!Array.isArray(value) || !value.length || value.length > entities.length) throw Error('Choose at least one native command, at most one per configured blind');
  const seen = new Set<string>();
  for (const c of value) {
    if (!object(c) || !nativeServices.includes(c.service) || !entities.includes(c.entity_id) || seen.has(c.entity_id)) throw Error('Only unique configured covers and supported native services are allowed');
    const field = c.service === 'set_cover_position' ? 'position' : c.service === 'set_cover_tilt_position' ? 'tilt_position' : undefined;
    if (!keys(c, ['service','entity_id', ...(field ? [field] : [])]) || (field && (typeof c[field] !== 'number' || !Number.isFinite(c[field]) || c[field] < 0 || c[field] > 100))) throw Error('Native values must be literal numbers 0–100; extra fields are not allowed');
    seen.add(c.entity_id);
  }
  return structuredClone(value) as BlindCommand[];
}
/** Parse only flat literal cover recipes. Script metadata is not executable. */
export function importCommands(response: unknown, entities: string[]): BlindCommand[] {
  const config = (response as any)?.config ?? response;
  if (!object(config) || !Array.isArray((config as any).sequence) || !(config as any).sequence.length) throw Error('Script must have a simple cover-only sequence');
  const commands: any[] = [];
  for (const step of (config as any).sequence) {
    if (!keys(step, ['action','service','target','data']) || (Object.hasOwn(step, 'action') === Object.hasOwn(step, 'service'))) throw Error('Only simple literal cover actions are supported');
    const action = step.action ?? step.service;
    if (typeof action !== 'string' || !action.startsWith('cover.') || !nativeServices.includes(action.slice(6) as any)) throw Error('Only supported native cover actions are allowed');
    if (step.target !== undefined && !keys(step.target, ['entity_id'])) throw Error('Only literal entity targets are supported');
    if (step.data !== undefined && !keys(step.data, ['entity_id','position','tilt_position'])) throw Error('Unsupported action data');
    if (step.target?.entity_id !== undefined && step.data?.entity_id !== undefined) throw Error('Use exactly one entity target');
    const ids = step.target?.entity_id ?? step.data?.entity_id;
    const targets = Array.isArray(ids) ? ids : [ids];
    if (!targets.length) throw Error('Missing target');
    const {entity_id: _, ...data} = step.data ?? {};
    for (const entity_id of targets) commands.push({service:action.slice(6),entity_id,...data});
  }
  return validateCommands(commands, entities);
}
export function nativeAvailable(s: State | undefined, c: BlindCommand) {
  const tilt = c.service === 'set_cover_tilt_position';
  const field = tilt ? 'current_tilt_position' : 'current_position';
  const capability = {open_cover:1,close_cover:2,set_cover_position:4,set_cover_tilt_position:128}[c.service];
  const features = s?.attributes.supported_features;
  const v = s?.attributes[field];
  return !!s && ['open','closed','opening','closing'].includes(s.state) && typeof features === 'number' && Number.isInteger(features) && (features & capability) !== 0 && typeof v === 'number' && Number.isFinite(v) && v >= 0 && v <= 100;
}
export function nativeMatches(s: State | undefined, c: BlindCommand) {
  if (!nativeAvailable(s,c) || !['open','closed'].includes(s!.state)) return false;
  // A top-open sequential shade also reports bottom position 0; that is not fully closed.
  if (c.service === 'close_cover' && s!.state !== 'closed') return false;
  // Sequential endpoint values overlap another travel segment. Require both native reports
  // before suppressing a command or declaring its gathered-bottom endpoint matched.
  if (c.service === 'set_cover_position' && c.position === 0 && !(typeof s!.attributes.current_tilt_position === 'number' && Math.abs(s!.attributes.current_tilt_position - 100) <= 2)) return false;
  if (c.service === 'set_cover_tilt_position' && c.tilt_position === 100 && !(typeof s!.attributes.current_position === 'number' && Math.abs(s!.attributes.current_position) <= 2)) return false;
  const expected = c.service === 'open_cover' ? 100 : c.service === 'close_cover' ? 0 : c.service === 'set_cover_position' ? c.position : c.tilt_position;
  return Math.abs(s!.attributes[c.service === 'set_cover_tilt_position' ? 'current_tilt_position' : 'current_position'] - expected) <= 2;
}
