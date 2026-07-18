import type {
  AtlasMotionMode,
  AtlasPhase,
} from "@/lib/atlas/atlas-types";
import styles from "./AtlasCharacter.module.css";

interface AtlasCharacterProps {
  readonly mode: AtlasMotionMode;
  readonly phase: AtlasPhase;
}

export function AtlasCharacter({ mode, phase }: AtlasCharacterProps) {
  return (
    <svg
      className={styles.character}
      data-mode={mode}
      data-phase={phase}
      viewBox="0 0 180 230"
      aria-hidden="true"
      focusable="false"
    >
      <ellipse className={styles.shadow} cx="90" cy="213" rx="49" ry="8" />

      <g className={styles.mobilitySystem} data-part="mobility-system">
        <rect
          className={styles.leftFoot}
          data-part="left-foot"
          x="45"
          y="193"
          width="35"
          height="16"
          rx="8"
        />
        <rect
          className={styles.rightFoot}
          data-part="right-foot"
          x="100"
          y="193"
          width="35"
          height="16"
          rx="8"
        />
      </g>

      <g className={styles.leftArm} data-part="left-arm">
        <path d="M48 116 C25 124, 23 151, 35 164" />
        <circle cx="35" cy="166" r="8" />
      </g>
      <g className={styles.rightArm} data-part="right-arm">
        <path d="M132 116 C155 124, 157 151, 145 164" />
        <circle cx="145" cy="166" r="8" />
      </g>

      <g className={styles.body} data-part="body-shell">
        <rect x="42" y="100" width="96" height="99" rx="36" />
        <rect
          className={styles.utilityPanel}
          data-part="utility-panel"
          x="68"
          y="145"
          width="44"
          height="26"
          rx="8"
        />
        <circle
          className={styles.statusLight}
          data-part="status-light"
          cx="90"
          cy="184"
          r="5"
        />
      </g>

      <g className={styles.head} data-part="head">
        <rect x="28" y="37" width="124" height="86" rx="35" />
        <rect
          className={styles.faceDisplay}
          data-part="face-display"
          x="42"
          y="55"
          width="96"
          height="51"
          rx="22"
        />
        <g className={styles.eyes} data-part="eyes">
          <ellipse
            className={styles.leftEye}
            data-part="left-eye"
            cx="72"
            cy="80"
            rx="8"
            ry="11"
          />
          <ellipse
            className={styles.rightEye}
            data-part="right-eye"
            cx="108"
            cy="80"
            rx="8"
            ry="11"
          />
        </g>
      </g>

      <g className={styles.antenna} data-part="antenna">
        <circle
          className={styles.antennaBase}
          data-part="antenna-base"
          cx="90"
          cy="38"
          r="9"
        />
        <path
          className={styles.antennaStem}
          data-part="antenna-stem"
          d="M90 31 C90 20, 91 14, 91 8"
        />
        <circle
          className={styles.antennaTip}
          data-part="antenna-tip"
          cx="91"
          cy="7"
          r="6"
        />
      </g>
    </svg>
  );
}
