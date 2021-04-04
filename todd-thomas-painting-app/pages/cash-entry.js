import styles from "../styles/Home.module.css";
import NavigationBar from "../components/NavigationBar";
export default function CashEntry() {
  return (
    <div className={styles.container}>
      <NavigationBar />
      <h1>Cash Entry</h1>
    </div>
  );
  }