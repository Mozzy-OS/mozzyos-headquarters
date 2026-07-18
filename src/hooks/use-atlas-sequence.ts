"use client";

import { useCallback, useEffect, useReducer } from "react";
import {
  createInitialAtlasState,
  isAtlasArrivalComplete,
  transitionAtlas,
} from "@/lib/atlas/atlas-machine";
import { getAtlasPhaseDuration } from "@/lib/atlas/atlas-timeline";
import type { AtlasMotionMode } from "@/lib/atlas/atlas-types";

const WATCHDOG_GRACE_MS = 1200;

function now(): number {
  return performance.now();
}

export function useAtlasSequence() {
  const [state, dispatch] = useReducer(
    transitionAtlas,
    undefined,
    () => createInitialAtlasState(0),
  );

  useEffect(() => {
    if (state.sequenceId === 0) {
      return;
    }

    const durationMs = getAtlasPhaseDuration(state.mode, state.phase);

    if (durationMs === null) {
      return;
    }

    const phase = state.phase;
    const sequenceId = state.sequenceId;
    const elapsedMs = Math.max(0, now() - state.enteredAt);
    const remainingMs = Math.max(0, durationMs - elapsedMs);

    const phaseTimer = window.setTimeout(() => {
      dispatch({
        type: "PHASE_ELAPSED",
        phase,
        sequenceId,
        now: now(),
      });
    }, remainingMs);

    const watchdogTimer = window.setTimeout(() => {
      dispatch({
        type: "WATCHDOG_EXPIRED",
        phase,
        sequenceId,
        now: now(),
      });
    }, remainingMs + WATCHDOG_GRACE_MS);

    return () => {
      window.clearTimeout(phaseTimer);
      window.clearTimeout(watchdogTimer);
    };
  }, [state]);

  useEffect(() => {
    const reconcileVisibility = () => {
      if (document.visibilityState === "visible") {
        dispatch({ type: "DOCUMENT_VISIBLE", now: now() });
      }
    };

    document.addEventListener("visibilitychange", reconcileVisibility);
    return () =>
      document.removeEventListener("visibilitychange", reconcileVisibility);
  }, []);

  const setMode = useCallback((mode: AtlasMotionMode) => {
    dispatch({ type: "SET_MODE", mode, now: now() });
  }, []);

  const skip = useCallback(() => {
    dispatch({ type: "SKIP", now: now() });
  }, []);

  return {
    state,
    setMode,
    skip,
    isArrivalComplete: isAtlasArrivalComplete(state),
    phaseDurationMs: getAtlasPhaseDuration(state.mode, state.phase),
  };
}
