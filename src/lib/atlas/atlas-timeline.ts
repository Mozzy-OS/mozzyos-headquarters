import type {
  AtlasMotionMode,
  AtlasPhase,
  AtlasTimelineStep,
} from "./atlas-types";

const fullEnergyTimeline = [
  { phase: "distant-wander", durationMs: 1050 },
  { phase: "inspect", durationMs: 650 },
  { phase: "distracted", durationMs: 380 },
  { phase: "notice", durationMs: 260 },
  { phase: "freeze", durationMs: 300 },
  { phase: "double-take", durationMs: 420 },
  { phase: "sprint", durationMs: 900 },
  { phase: "slide", durationMs: 500 },
  { phase: "antenna-bent", durationMs: 420 },
  { phase: "antenna-notice", durationMs: 420 },
  { phase: "antenna-correct", durationMs: 320 },
  { phase: "compose-self", durationMs: 340 },
  { phase: "greet", durationMs: 500 },
  { phase: "idle-energetic", durationMs: null },
] as const satisfies ReadonlyArray<AtlasTimelineStep>;

const calmTimeline = [
  { phase: "distant-wander", durationMs: 1400 },
  { phase: "inspect", durationMs: 900 },
  { phase: "distracted", durationMs: 500 },
  { phase: "notice", durationMs: 350 },
  { phase: "freeze", durationMs: 400 },
  { phase: "double-take", durationMs: 500 },
  { phase: "sprint", durationMs: 1300 },
  { phase: "slide", durationMs: 650 },
  { phase: "antenna-bent", durationMs: 400 },
  { phase: "antenna-notice", durationMs: 500 },
  { phase: "antenna-correct", durationMs: 450 },
  { phase: "compose-self", durationMs: 400 },
  { phase: "greet", durationMs: 400 },
  { phase: "idle-calm", durationMs: null },
] as const satisfies ReadonlyArray<AtlasTimelineStep>;

const reducedMotionTimeline = [
  { phase: "reduced-motion-ready", durationMs: 240 },
  { phase: "greet", durationMs: 320 },
  { phase: "idle-calm", durationMs: null },
] as const satisfies ReadonlyArray<AtlasTimelineStep>;

export const ATLAS_TIMELINES = Object.freeze({
  "full-energy": fullEnergyTimeline,
  calm: calmTimeline,
  "reduced-motion": reducedMotionTimeline,
}) satisfies Readonly<
  Record<AtlasMotionMode, ReadonlyArray<AtlasTimelineStep>>
>;

export function getAtlasTimeline(
  mode: AtlasMotionMode,
): ReadonlyArray<AtlasTimelineStep> {
  return ATLAS_TIMELINES[mode];
}

export function getAtlasStep(
  mode: AtlasMotionMode,
  phase: AtlasPhase,
): AtlasTimelineStep | undefined {
  return getAtlasTimeline(mode).find((step) => step.phase === phase);
}

export function getAtlasPhaseDuration(
  mode: AtlasMotionMode,
  phase: AtlasPhase,
): number | null {
  return getAtlasStep(mode, phase)?.durationMs ?? null;
}
