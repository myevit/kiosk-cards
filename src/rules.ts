import type { Config, Hass } from "./types.js";
/** JSON-only, bounded expressions. Never executes code or accesses globals. */
export type Expression = any;
const ops = new Set(["if","eq","ne","includes","in","and","or","not","defined","finite","number","round","gt","lt","concat","capitalize","map","countdown","minutes"]);
export function validateExpression(e: Expression, depth = 0): void {
  if (depth > 24) throw Error("Rule nesting exceeds 24");
  if (!e || typeof e !== "object") return;
  if (Array.isArray(e)) { if(e.length>100) throw Error("Rule list too large"); e.forEach(v=>validateExpression(v,depth+1));return; }
  if (e.op !== undefined) {
    if (!ops.has(e.op) || !Array.isArray(e.args) || e.args.length>100) throw Error("Unknown rule operation");
    e.args.forEach((a:Expression)=>validateExpression(a,depth+1));
  } else if (e.entity !== undefined || e.attribute !== undefined || e.state !== undefined || e.last_changed !== undefined) {
    if (e.attribute && ["__proto__","constructor","prototype"].includes(e.attribute)) throw Error("Unsafe attribute");
    if (e.entity !== undefined && typeof e.entity !== "string") throw Error("Rule entity must be a string");
  } else Object.values(e).forEach(a=>validateExpression(a,depth+1));
}
export function evaluate(e: Expression, hass: Hass, config: Config, now = Date.now()): any {
  if (!e || typeof e !== "object") return e;
  if (!e.op) {
    if (e.entity !== undefined || e.attribute !== undefined || e.state !== undefined || e.last_changed !== undefined) {
      const s=hass?.states[e.entity || config.entity || ""];
      return e.attribute !== undefined ? s?.attributes[e.attribute] : e.last_changed ? s?.last_changed : s?.state;
    }
    return e; // Literal map; no property traversal or executable text.
  }
  const v=(i:number)=>evaluate(e.args[i],hass,config,now);
  switch(e.op) {
    case "if":return v(0)?v(1):v(2);
    case "eq":return v(0)===v(1);
    case "ne":return v(0)!==v(1);
    case "includes":return typeof v(0)==="string" && v(0).includes(v(1));
    case "in":return Array.isArray(v(1)) && v(1).includes(v(0));
    case "and":return e.args.every((_:any,i:number)=>!!v(i));
    case "or":return e.args.some((_:any,i:number)=>!!v(i));
    case "not":return !v(0);
    case "defined":return v(0)!==undefined;
    case "finite":return Number.isFinite(v(0));
    case "number":return Number(v(0));
    case "round":return Math.round(Number(v(0)));
    case "gt":return v(0)>v(1);
    case "lt":return v(0)<v(1);
    case "concat":return e.args.map((_:any,i:number)=>v(i)??"").join("");
    case "capitalize":{const s=String(v(0)??"");return s.charAt(0).toUpperCase()+s.slice(1);}
    case "map":{const m=v(1);return Object.hasOwn(m,String(v(0)))?m[String(v(0))]:m.default??v(2);}
    case "minutes":{const t=Date.parse(v(0));return Number.isFinite(t)?Math.max(0,Math.ceil((t-now)/60000)):NaN;}
    case "countdown":{const t=Date.parse(v(0));if(!Number.isFinite(t))return v(1)??"";const m=Math.max(0,Math.ceil((t-now)/60000)),h=Math.floor(m/60);return h>0?`${h}h ${String(m%60).padStart(2,"0")}m left`:`${m}m left`;}
  }
}
export function hasClock(config: Config): boolean {
  return /"op":"(?:countdown|minutes)"/.test(JSON.stringify(config.presentation));
}
export function validateRules(config: Config) {
  validateExpression(config.presentation);
  for(const [key,rules] of Object.entries(config.action_rules || {})) {
    if(!/^(icon_)?(tap|hold|double_tap)_action$/.test(key) || !Array.isArray(rules) || rules.length>100) throw Error("Invalid action rules");
    for(const rule of rules) {validateExpression(rule.when);if(!rule.action || typeof rule.action.action!=="string")throw Error("Rule requires action");}
  }
}
