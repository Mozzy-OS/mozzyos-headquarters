import { getAtlasTimeline } from "./atlas-timeline";
import type {
  AtlasMachineEvent,
  AtlasMachineState,
  AtlasMotionMode,
} from "./atlas-types";

function isTerminalPhase(state: AtlasMachineState): boolean {
  return state.phase === "idle-energetic" || state.phase === "idle-calm";
}

function firstStateForMode(
  mode: AtlasMotionMode,
  sequenceId: number,
  now: number,
): AtlasMachineState {
  const [firstStep] = getAtlasTimeline(mode);

  return {
    mode,
    phase: firstStep.phase,
    sequenceId,
    enteredAt: now,
    completed: false,
  };
}

function advanceOnePhase(
  state: AtlasMachineState,
  now: number,
): AtlasMachineState {
  const timeline = getAtlasTimeline(state.mode);
  const currentIndex = timeline.findIndex((step) => step.phase === state.phase);
  const nextStep = timeline[currentIndex + 1];

  if (!nextStep) {
    return { ...state, completed: true };
  }

  return {
    ...state,
    phase: nextStep.phase,
    enteredAt: now,
    completed: nextStep.durationMs === null,
  };
}

function reconcileVisibleState(
  state: AtlasMachineState,
  now: number,
): AtlasMachineState {
  let nextState = state;
  let elapsedMs = Math.max(0, now - state.enteredAt);
  let safetyCount = 0;

  while (!isTerminalPhase(nextState) && safetyCount < 32) {
    const currentStep = getAtlasTimeline(nextState.mode).find(
      (step) => step.phase === nextState.phase,
    );

    if (currentStep?.durationMs == null || elapsedMs < currentStep.durationMs) {
      break;
    }

    elapsedMs -= currentStep.durationMs;
    nextState = advanceOnePhase(
      nextState,
      now - elapsedMs,
    );
    safetyCount += 1;
  }

  return nextState;
}

function recoverToGreeting(
  state: AtlasMachineState,
  now: number,
): AtlasMachineState {
  if (isTerminalPhase(state) || state.phase === "greet") {
    return state;
  }

  return {
    ...state,
    phase: "greet",
    sequenceId: state.sequenceId + 1,
    enteredAt: now,
    completed: false,
  };
}

export function createInitialAtlasState(now = 0): AtlasMachineState {
  return firstStateForMode("reduced-motion", 0, now);
}

export function transitionAtlas(
  state: AtlasMachineState,
  event: AtlasMachineEvent,
): AtlasMachineState {
  switch (event.type) {
    case "START":
      return firstStateForMode(state.mode, state.sequenceId + 1, event.now);

    case "SET_MODE":
      return firstStateForMode(event.mode, state.sequenceId + 1, event.now);

    case "SKIP":
      return recoverToGreeting(state, event.now);

    case "PHASE_ELAPSED":
      if (
        event.sequenceId !== state.sequenceId ||
        event.phase !== state.phase ||
        isTerminalPhase(state)
      ) {
        return state;
      }

      return advanceOnePhase(state, event.now);

    case "WATCHDOG_EXPIRED":
      if (
        event.sequenceId !== state.sequenceId ||
        event.phase !== state.phase
      ) {
        return state;
      }

      if (state.phase === "greet") {
        return advanceOnePhase(state, event.now);
      }

      return recoverToGreeting(state, event.now);

    case "DOCUMENT_VISIBLE":
      return reconcileVisibleState(state, event.now);

    default: {
      const unreachable: never = event;
      return unreachable;
    }
  }
}

export function isAtlasArrivalComplete(state: AtlasMachineState): boolean {
  return state.phase === "greet" || isTerminalPhase(state);
}
