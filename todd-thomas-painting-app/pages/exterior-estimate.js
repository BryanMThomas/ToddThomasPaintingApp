import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import ClientInfo from "../components/ClientInfo";
import LineItems from "../components/LineItems";
export default function ExteriorEstimate() {
  //PRICING CONSTS
  const deluxeRate = 1.15;
  const ultimateRate = 1.22;
  const maximumRate = 1.35;

  const [exteriorState, setExteriorState] = useState({
    clientName: "",
    clientAddress: "",
    clientPhone: "",
    clientEmail: "",
    homeSqft: -1,
    deluxePackagePrice: 0,
    ultimatePackagePrice: 0,
    maximumPackagePrice: 0,
    lineItems: [{}],
  });
  const handleSqftChange = (e) => {
    let value = e.target.value;
    //Set Sqft
    setExteriorState((prevState) => ({
      ...prevState,
      ["homeSqft"]: value,
      ["deluxePackagePrice"]: Math.round(value * deluxeRate),
      ["ultimatePackagePrice"]: Math.round(value * ultimateRate),
      ["maximumPackagePrice"]: Math.round(value * maximumRate),
    }));
  };
  const handleStateChange = (e) => {
    if (e.target.name === "homeSqft") {
      handleSqftChange(e);
    } else {
      const { name, value } = e.target;
      setExteriorState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  const handleLineItemChange = (e) => {
    const { name, value } = e.target;
    setExteriorState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRemove = (i) => {
    // const productLines = invoice.productLines.filter((productLine, index) => index !== i)
    // setInvoice({ ...invoice, productLines })
  };

  const submit = () => {};
  return (
    <Layout>
      <div className={styles.container}>
        <h1>Exterior Estimate</h1>
        <p>Enter Quote Details Here</p>
        <br />
        <form onSubmit={submit} className={styles.formInput}>
          <ClientInfo handleStateChange={handleStateChange} />
          <br />
          <p>
            <label>Home SQFT </label>
            <input
              id="homeSqft"
              name="homeSqft"
              type="number"
              onChange={handleStateChange}
            />
          </p>
          <p>
            <label>Deluxe Package $</label>
            <input
              id="deluxePackagePrice"
              name="deluxePackagePrice"
              type="number"
              min="0"
              max="10000"
              value={exteriorState.deluxePackagePrice}
              onChange={handleStateChange}
            />
            <label>Ultimate Package $</label>
            <input
              id="ultimatePackagePrice"
              name="ultimatePackagePrice"
              type="number"
              min="0"
              max="10000"
              value={exteriorState.ultimatePackagePrice}
              onChange={handleStateChange}
            />
            <label>Maximum Package $</label>
            <input
              id="maximumPackagePrice"
              name="maximumPackagePrice"
              type="number"
              min="0"
              max="10000"
              value={exteriorState.maximumPackagePrice}
              onChange={handleStateChange}
            />
          </p>
          <LineItems handleRemove={handleRemove} state={exteriorState} />
          <br />
          <button type="submit">Download PDF</button>
        </form>
      </div>
    </Layout>
  );
}
