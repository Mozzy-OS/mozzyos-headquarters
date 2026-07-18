"use client";

import type { AtlasMotionMode } from "@/lib/atlas/atlas-types";
import styles from "./MotionModeControl.module.css";

interface MotionModeControlProps {
  readonly mode: AtlasMotionMode;
  readonly systemPrefersReducedMotion: boolean;
  readonly onModeChange: (mode: AtlasMotionMode) => void;
}

const modeOptions: ReadonlyArray<{
  readonly value: AtlasMotionMode;
  readonly label: string;
}> = [
  { value: "full-energy", label: "Full Energy" },
  { value: "calm", label: "Calm" },
  { value: "reduced-motion", label: "Reduced Motion" },
];

export function MotionModeControl({
  mode,
  systemPrefersReducedMotion,
  onModeChange,
}: MotionModeControlProps) {
  return (
    <fieldset className={styles.control}>
      <legend className={styles.legend}>Atlas motion</legend>
      <div className={styles.options}>
        {modeOptions.map((option) => (
          <label className={styles.option} key={option.value}>
            <input
              className={styles.input}
              type="radio"
              name="atlas-motion-mode"
              value={option.value}
              checked={mode === option.value}
              onChange={() => onModeChange(option.value)}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
      {systemPrefersReducedMotion ? (
        <p className={styles.systemNote}>
          Your system preference requests reduced motion.
        </p>
      ) : null}
    </fieldset>
  );
}
