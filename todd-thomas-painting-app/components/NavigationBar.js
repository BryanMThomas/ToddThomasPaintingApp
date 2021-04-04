import styles from "../styles/Home.module.css";
import Link from "next/link";
export default function NavigationBar() {
  return (
    <div className={styles.header}>
      <Link href="/">
        <img src="https://todd-thomas-painting.s3-us-west-2.amazonaws.com/ttp-logo.png" alt="Logo" width={80} height={80} href="/" />
      </Link>
      <Link href="/exterior-estimate">
        <a>Exeterior Estimate</a>
      </Link>
      <Link href="/interior-estimate">
        <a>Interior Estimate</a>
      </Link>
      <Link href="/cabinet-estimate">
        <a>Cabinet Estimate</a>
      </Link>
      <Link href="/cash-entry">
        <a>Cash Entry</a>
      </Link>
    </div>
  );
}
