"use client"
import styles from "./page.module.css";
import Selector from "./components/selector";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <p className={styles.title}>Instituições de ensino superior por país</p>
        <Selector />
      </div>
    </main>
  );
}
