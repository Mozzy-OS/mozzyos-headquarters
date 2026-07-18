import { AtlasExperience } from "@/components/atlas/AtlasExperience";
import { AtlasGreeting } from "@/components/atlas/AtlasGreeting";
import styles from "./HeadquartersEnvironment.module.css";

export function HeadquartersEnvironment() {
  return (
    <section className={styles.environment} aria-labelledby="headquarters-title">
      <header className={styles.header}>
        <p className={styles.release}>Headquarters v0.1</p>
        <h1 className={styles.title} id="headquarters-title">
          MozzyOS Headquarters
        </h1>
        <p className={styles.codename}>Atlas Arrives</p>
      </header>

      <div className={styles.world} aria-hidden="true">
        <span className={styles.orbitOne} />
        <span className={styles.orbitTwo} />
        <span className={styles.beacon} />
        <span className={styles.markerOne} />
        <span className={styles.markerTwo} />
        <span className={styles.horizon} />
      </div>

      <AtlasExperience arrivalSide="right" greeting={<AtlasGreeting />} />
    </section>
  );
}
