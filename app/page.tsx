"use client"
import styles from "./page.module.css";
import Selector from "./components/selector";
import { useState } from "react";
import List from "./components/list";

export default function Home() {
  const [countrySelected, setCountrySelected] = useState<string>('');

  const handleSelect = (selected: string) => {
    setCountrySelected(selected);
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <p className={styles.title}>Instituições de ensino superior por país</p>
        <Selector handleParentSelect={handleSelect} />
        <List countrySelected={countrySelected} />
      </div>
    </main>
  );
}
