import styles from "../../Home.module.css";

export default function Layout({ children }) {
  return <div className={styles.container}> {children}</div>;
}
