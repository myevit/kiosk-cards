export interface State {
  entity_id: string;
  state: string;
  attributes: Record<string, any>;
  last_changed?: string;
}
export interface Hass {
  states: Record<string, State>;
  entities?: Record<string, any>;
  devices?: Record<string, any>;
  areas?: Record<string, any>;
  user?: { id: string };
  locale?: { language: string };
  localize?: (key: string, ...args: any[]) => string;
  formatEntityState?: (state: State) => string;
  callService: (
    domain: string,
    service: string,
    data?: Record<string, any>,
    target?: Record<string, any>,
  ) => Promise<any>;
}
export interface Action {
  action:
    | "none"
    | "more-info"
    | "toggle"
    | "perform-action"
    | "call-service"
    | "navigate"
    | "url"
    | "assist"
    | "fire-dom-event";
  entity?: string;
  perform_action?: string;
  service?: string;
  data?: Record<string, any>;
  service_data?: Record<string, any>;
  target?: Record<string, any>;
  navigation_path?: string;
  navigation_replace?: boolean;
  url_path?: string;
  confirmation?:
    | boolean
    | {
        text?: string;
        title?: string;
        confirm_text?: string;
        dismiss_text?: string;
        exemptions?: { user: string }[];
      };
  [key: string]: any;
}
export interface Appearance {
  icon_color?: string;
  background?: string;
  active_background?: string;
  radius?: string;
}
export interface Config {
  type: string;
  entity?: string;
  name?: string;
  icon?: string;
  detail?: string;
  appearance?: Appearance;
  active_states?: string[];
  tap_action?: Action;
  icon_tap_action?: Action;
  hold_action?: Action;
  double_tap_action?: Action;
  icon_hold_action?: Action;
  icon_double_tap_action?: Action;
  area?: string;
  navigation_path?: string;
  temperature_entity?: string;
  occupancy_entity?: string;
  light_entities?: string[];
  grid_options?: Record<string, any>;
  [key: string]: any;
}
