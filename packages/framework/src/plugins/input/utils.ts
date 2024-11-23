export interface ControlsStructure {
  keyboard?: {
    down?: Record<string, { context: string[] | '*'; input: string | string[] }>;
    up?: Record<string, { context: string[] | '*'; input: string | string[] }>;
  };
  touch?: {
    down?: Record<string, { context: string[] | '*'; input: string }>;
    joystick?: Record<string, { context: string[] | '*'; input: string[] }>;
  };
}
