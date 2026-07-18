import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.placeholder} aria-labelledby="page-title">
        <h1 id="page-title" className={styles.title}>
          MozzyOS Headquarters
        </h1>
        <p className={styles.release}>Headquarters v0.1</p>
        <p className={styles.codename}>Atlas Arrives</p>
      </section>
    </main>
  );
}
