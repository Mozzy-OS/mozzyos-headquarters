import styles from "./AtlasGreeting.module.css";

export function AtlasGreeting() {
  return (
    <div className={styles.greeting}>
      <h2 className={styles.hello}>Hello.</h2>
      <p className={styles.introduction}>I&apos;m Atlas.</p>
      <p className={styles.welcome}>Welcome to MozzyOS.</p>
    </div>
  );
}
