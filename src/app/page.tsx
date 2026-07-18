import { HeadquartersEnvironment } from "@/components/headquarters/HeadquartersEnvironment";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <HeadquartersEnvironment />
    </main>
  );
}
