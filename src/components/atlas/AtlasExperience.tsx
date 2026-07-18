"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect } from "react";
import { useAtlasSequence } from "@/hooks/use-atlas-sequence";
import { useMotionPreference } from "@/hooks/use-motion-preference";
import type {
  AtlasArrivalSide,
  AtlasMotionMode,
} from "@/lib/atlas/atlas-types";
import { AtlasCharacter } from "./AtlasCharacter";
import { MotionModeControl } from "./MotionModeControl";
import { SkipArrivalControl } from "./SkipArrivalControl";
import styles from "./AtlasExperience.module.css";

interface AtlasExperienceProps {
  readonly arrivalSide?: AtlasArrivalSide;
  readonly greeting: ReactNode;
}

type AtlasStyle = CSSProperties & {
  "--phase-duration": string;
};

export function AtlasExperience({
  arrivalSide = "right",
  greeting,
}: AtlasExperienceProps) {
  const prefersReducedMotion = useMotionPreference();
  const {
    state,
    setMode,
    skip,
    isArrivalComplete,
    phaseDurationMs,
  } = useAtlasSequence();

  useEffect(() => {
    if (prefersReducedMotion === null) {
      return;
    }

    setMode(prefersReducedMotion ? "reduced-motion" : "full-energy");
  }, [prefersReducedMotion, setMode]);

  const handleModeChange = (mode: AtlasMotionMode) => {
    setMode(mode);
  };

  const phaseStyle: AtlasStyle = {
    "--phase-duration": `${phaseDurationMs ?? 0}ms`,
  };

  return (
    <section
      className={styles.experience}
      data-arrival-side={arrivalSide}
      data-mode={state.mode}
      data-phase={state.phase}
      aria-label="Atlas arrival experience"
      style={phaseStyle}
    >
      <div className={styles.controls}>
        <MotionModeControl
          mode={state.mode}
          systemPrefersReducedMotion={prefersReducedMotion === true}
          onModeChange={handleModeChange}
        />
        {!isArrivalComplete ? (
          <SkipArrivalControl className={styles.skip} onSkip={skip} />
        ) : null}
      </div>

      <div className={styles.stage} aria-hidden="true">
        <div className={styles.atlasTrack}>
          <AtlasCharacter mode={state.mode} phase={state.phase} />
        </div>
      </div>

      <div
        className={styles.greetingPanel}
        data-revealed={isArrivalComplete}
      >
        {greeting}
      </div>
    </section>
  );
}
