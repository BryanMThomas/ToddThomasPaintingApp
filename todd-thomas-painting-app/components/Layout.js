import Footer from "./Footer";
import NavigationBar from "./NavigationBar";
import styles from "../styles/Home.module.css";

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <NavigationBar />
      {children}
      <Footer />
    </div>
  );
}
