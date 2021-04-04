import Head from "next/head";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Todd Thomas Painting</title>
        <link rel="icon" href="/ttp-logo.png" />
      </Head>
      <Layout>
      <main className={styles.main}>
        <div className={styles.grid}>
          <a href="/exterior-estimate" className={styles.card}>
            <h3>Exterior Estimate &rarr;</h3>
            <p>Create an Estimate for Exterior Home Project</p>
          </a>

          <a href="/interior-estimate" className={styles.card}>
            <h3>Interior Estimate</h3>
            <p>Create an Estimate for Interior or Line Item Paint Project</p>
          </a>

          <a href="/cabinet-estimate" className={styles.card}>
            <h3>Cabinet Estimate &rarr;</h3>
            <p>Create an Estimate for Cabinet Paint Project</p>
          </a>

          <a href="/cash-entry" className={styles.card}>
            <h3>Cash Entry &rarr;</h3>
            <p>Cash Entry</p>
          </a>
        </div>
      </main>
      </Layout>
    </div>
  );
}
