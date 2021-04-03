import styles from "../styles/Home.module.css";
import NavigationBar from "../components/NavigationBar";
export default function CabinetEstimate() {
  return (
    <div className={styles.container}>
      <NavigationBar />
      <h1>Cabinet Estimate</h1>
    </div>
  );
}
