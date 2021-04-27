import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import Layout from "../Layout/Layout";
import { LineItems } from "../LineItems/LineItems";
import styled from "styled-components";
import { postEsimtate } from "../../utilities/api";
import { getDate } from "../../utilities/util";

const Styles = styled.div`
  margin-top: 2%;
  margin-left: 3%;
  .listingsFilter {
    width: 30%;
    max-width: 425px;
    display: inline-block;
    float: left;
    background-color: #d3d3d3;
    padding: 15px;
  }

  .listingsData {
    width: 70%;
    max-width: 200px;
    float: left;
    display: inline-block;
    padding: 15px;
    margin-left: 30px;
  }
`;
export const CabinetEstimate = () => {
  //PRICING CONSTS
  const pricePerOpening = 45;
  //STATE VARIABLES
  const [cabinetState, setCabinetState] = useState({
    clientName: "",
    clientAddress: "",
    clientPhone: "",
    clientEmail: "",
    openings: -1,
    cabinetPrice: "0",
    otherPrice: "0",
    totalPrice: "0",
    note: "",
    noteTemp: "",
    responseData: {},
    lineItems: [{ description: "", cost: "" }],
  });
  //METHODS
  const setLineItems = (list) => {
    let itemsTotal = 0;
    for (var i = 0; i < list.length; i++) {
      itemsTotal += parseInt(list[i]["cost"].replace(/[$,]+/g, ""));
    }
    let cabinetTotal = parseInt(
      cabinetState.cabinetPrice.replace(/[$,]+/g, "")
    );
    let total =
      "$" +
      (itemsTotal + cabinetTotal)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    let itemsTotalFormat =
      "$" + itemsTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    setCabinetState((prevState) => ({
      ...prevState,
      lineItems: list,
      totalPrice: total,
      otherPrice: itemsTotalFormat,
    }));
  };
  const handleOpeningsChange = (e) => {
    let value = e.target.value;
    let cost = Math.round(value * pricePerOpening);
    //Set Sqft
    setCabinetState((prevState) => ({
      ...prevState,
      openings: value,
      cabinetPrice: "$" + cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      totalPrice:
        "$" +
        (cost + parseInt(cabinetState.otherPrice.replace(/[$,]+/g, "")))
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    }));
  };
  const handleCabinetPriceChange = (e) => {
    let value = e.target.value;
    let priceString = value;
    if (!priceString.includes("$")) {
      priceString = "$" + priceString;
    }
    let cabinetPriceInt = parseInt(priceString.replace(/[$,]+/g, ""));
    let otherPriceInt = parseInt(cabinetState.otherPrice.replace(/[$,]+/g, ""));
    let totalInt = cabinetPriceInt + otherPriceInt;
    let total = "$" + totalInt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    //Set Sqft
    setCabinetState((prevState) => ({
      ...prevState,
      cabinetPrice: priceString,
      totalPrice: total,
    }));
  };

  const handleStateChange = (e) => {
    const { name, value } = e.target;
    setCabinetState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  function createEstimate() {
    let date = getDate();
    let outputFileName = cabinetState.clientName.replace(" ", "") + "-" + date;
    let fields = {
      clientNamePdf: cabinetState.clientName,
      clientAddressPdf: cabinetState.clientAddress,
      clientEmailPdf: cabinetState.clientEmail,
      clientPhonePdf: cabinetState.clientPhone,
      openingsPdf: cabinetState.openings,
      cabinetPricePdf: cabinetState.cabinetPrice,
      otherPrice: cabinetState.otherPrice,
      totalPdf: cabinetState.totalPrice,
      notesPdf: cabinetState.note,
    };
    console.log("REQUEST BODY:" + JSON.stringify(fields));

    postEsimtate("CabinetTemplateForm.pdf","CabinetEstimates",outputFileName, fields).then((response) => {
      if (response.status !== 200) {
        //verify succesful call
        setCabinetState((prevState) => ({
          ...prevState,
          responseData: { error: true },
        }));
      } else {
        setCabinetState((prevState) => ({
          ...prevState,
          responseData: { response: response.status },
        }));
        let link =
          "https://todd-thomas-painting.s3-us-west-2.amazonaws.com/CabinetEstimates/" +
          outputFileName +
          ".pdf";
        window.open(link);
      }
    });

  }
  const handleNoteChange = (e) => {
    let itemsTotal = 0;
    for (var i = 0; i < cabinetState.lineItems.length; i++) {
      itemsTotal += parseInt(
        cabinetState.lineItems[i]["cost"].replace(/[$,]+/g, "")
      );
    }
    let cabinetTotal = parseInt(
      cabinetState.cabinetPrice.replace(/[$,]+/g, "")
    );
    let total =
      "$" +
      (itemsTotal + cabinetTotal)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    let itemsTotalFormat =
      "$" + itemsTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    let note = "";
    if (cabinetState.lineItems[0].description !== "") {
      note = "Additional Items Priced Seperately:\n";
      cabinetState.lineItems.forEach((lineItem) => {
        note = note + "\n" + lineItem.description + "\t\t " + lineItem.cost;
      });
      note = note + "\n\n";
    }

    const { name, value } = e.target;
    if (cabinetState.noteTemp !== "" && name === "noteTemp") {
      note = note + "Notes:\n\n" + value;
    }
    if (name === "noteTemp") {
      setCabinetState((prevState) => ({
        ...prevState,
        note: note,
        noteTemp: value,
      }));
    } else {
      setCabinetState((prevState) => ({
        ...prevState,
        note: note,
        totalPrice: total,
        otherPrice: itemsTotalFormat,
      }));
    }
  };

  const handleSubmit = () => {
    createEstimate();
  };

  //DOM STRUCTURE

  return (
    <Layout>
      <Styles>
        <h1>Cabinet Estimate</h1>
        {cabinetState.responseData.hasOwnProperty("error") ? (
          <div>
            <h1>Error Creating Estimate</h1>
            <p>Please screenshot page to save estimate info</p>
          </div>
        ) : (
          ""
        )}
        <br />
        <Form>
          <Form.Row>
            <Col xs="3">
              <Form.Label>Client Name: </Form.Label>
            </Col>
            <Col>
              <Form.Control
                name="clientName"
                type="text"
                placeholder="Enter Client Name"
                onChange={handleStateChange}
                value={cabinetState.clientName}
              />
            </Col>
          </Form.Row>
          <br />
          <Form.Row>
            <Col xs="3">
              <Form.Label>Client Address: </Form.Label>
            </Col>
            <Col>
              <Form.Control
                name="clientAddress"
                type="text"
                placeholder="Enter Client Address"
                onChange={handleStateChange}
              />
            </Col>
          </Form.Row>
          <br />
          <Form.Row>
            <Col xs="3">
              <Form.Label>Client Email: </Form.Label>
            </Col>
            <Col>
              <Form.Control
                name="clientEmail"
                type="email"
                placeholder="Enter Client Email"
                onChange={handleStateChange}
              />
            </Col>
          </Form.Row>
          <br />
          <Form.Row>
            <Col xs="3">
              <Form.Label>Client Phone: </Form.Label>
            </Col>
            <Col>
              <Form.Control
                name="clientPhone"
                type="text"
                placeholder="Enter Client Phone"
                onChange={handleStateChange}
              />
            </Col>
          </Form.Row>
          <br />
          <hr />
          <Form.Row>
            <Col xs="3">
              <Form.Label>Openings: </Form.Label>
            </Col>
            <Col xs="7">
              <Form.Control
                name="openings"
                type="number"
                placeholder="Enter # of Openings"
                required
                onChange={handleOpeningsChange}
              />
            </Col>
          </Form.Row>
          <br />
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Cabinets Price</Form.Label>
              <Form.Control
                name="cabinetPrice"
                type="text"
                value={cabinetState.cabinetPrice}
                onChange={handleCabinetPriceChange}
              />
            </Form.Group>
          </Form.Row>
          <LineItems
            lineItems={cabinetState.lineItems}
            setLineItems={setLineItems}
            handleNoteChange={handleNoteChange}
          />
          <br />
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Total Price</Form.Label>
              <Form.Control
                name="cabinetPrice"
                type="text"
                readOnly
                value={cabinetState.totalPrice}
                onChange={handleStateChange}
              />
            </Form.Group>
          </Form.Row>
          <br />
          <Form.Row>
            <Col xs="8">
              <Form.Label>Additional Notes</Form.Label>
              <Form.Control
                name="noteTemp"
                value={cabinetState.noteTemp}
                as="textarea"
                rows={3}
                onChange={handleNoteChange}
              />
            </Col>
          </Form.Row>
          <br />
          <Button variant="primary" onClick={handleSubmit}>
            Download &darr;
          </Button>
        </Form>
      </Styles>
    </Layout>
  );
};
