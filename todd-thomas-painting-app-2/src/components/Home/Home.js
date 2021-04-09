import React, { useState } from "react";
import styled from "styled-components";
import styles from "../../Home.module.css";

const Layout = styled.div`
  min-height: 100vh;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const Home = () => {
  return (
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
  );
};
