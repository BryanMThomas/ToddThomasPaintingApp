import styles from "../styles/Home.module.css";
import Link from "next/link";
import Image from "next/image";
export default function NavigationBar() {
  return (
    <div className={styles.header}>
      <Link href="/">
        <Image src="/ttp-logo.png" alt="Logo" width={80} height={80} href="/" />
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
