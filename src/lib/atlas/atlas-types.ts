export const ATLAS_MOTION_MODES = [
  "full-energy",
  "calm",
  "reduced-motion",
] as const;

export type AtlasMotionMode = (typeof ATLAS_MOTION_MODES)[number];

export const ATLAS_PHASES = [
  "distant-wander",
  "inspect",
  "distracted",
  "notice",
  "freeze",
  "double-take",
  "sprint",
  "slide",
  "antenna-bent",
  "antenna-notice",
  "antenna-correct",
  "compose-self",
  "greet",
  "idle-energetic",
  "idle-calm",
  "reduced-motion-ready",
] as const;

export type AtlasPhase = (typeof ATLAS_PHASES)[number];

export type AtlasArrivalSide = "left" | "right";

export interface AtlasTimelineStep {
  readonly phase: AtlasPhase;
  readonly durationMs: number | null;
}

export interface AtlasMachineState {
  readonly mode: AtlasMotionMode;
  readonly phase: AtlasPhase;
  readonly sequenceId: number;
  readonly enteredAt: number;
  readonly completed: boolean;
}

export type AtlasMachineEvent =
  | { readonly type: "START"; readonly now: number }
  | {
      readonly type: "PHASE_ELAPSED";
      readonly phase: AtlasPhase;
      readonly sequenceId: number;
      readonly now: number;
    }
  | {
      readonly type: "WATCHDOG_EXPIRED";
      readonly phase: AtlasPhase;
      readonly sequenceId: number;
      readonly now: number;
    }
  | {
      readonly type: "SET_MODE";
      readonly mode: AtlasMotionMode;
      readonly now: number;
    }
  | { readonly type: "SKIP"; readonly now: number }
  | { readonly type: "DOCUMENT_VISIBLE"; readonly now: number };
