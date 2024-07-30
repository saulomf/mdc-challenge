import { IoReload } from "react-icons/io5";
import styles from "./styles.module.css";

export default function Loading() {
    return (
        <div className={styles.container}>
            <IoReload color='gray' />
            <p className={styles.text}>Aguarde, carregando dados...</p>
        </div>
    );
}