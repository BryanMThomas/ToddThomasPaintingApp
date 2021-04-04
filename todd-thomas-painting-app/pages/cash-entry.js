import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
export default function CashEntry() {
  return (
    <Layout>
      <div className={styles.container}>
        <h1>Cash Entry</h1>
        <form className = {styles.formInput}>
          <label htmlFor="amount">Amount: </label>
          <input id="amount" type="text" autoComplete="amount" required />
          <button type="submit">Submit</button>
        </form>
      </div>
    </Layout>
  );
}
