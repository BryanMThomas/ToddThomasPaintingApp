import React, { useState, useEffect, useRef } from "react";
import { Form, Button, Col } from "react-bootstrap";
import Layout from "../Layout/Layout";
import { InteriorLineItems } from "../InteriorLineItems/InteriorLineItems";
import styled from "styled-components";
import {
  postEsimtate,
  postEstimateToDB,
  getCoordsFromAddress,
} from "../../utilities/api";
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
  const pricePerOpening = 100;
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
    notes: "",
    lineItemsDesc: "",
    lineItemsCost: "",
    responseData: {},
    lineItems: [{ description: "", cost: "" }],
  });

  const [coordsState, setCoordsState] = useState({
    longitude: "",
    latitude: "",
  });

  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      createEstimate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coordsState]);

  //METHODS
  const setLineItems = (list) => {
    let itemsTotal = 0;
    for (var i = 0; i < list.length; i++) {
      itemsTotal += parseInt(list[i]["cost"].replace(/[$,]+/g, ""));
    }
    let total =
      "$" + itemsTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
      cabinetPrice: "$" + cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    }));
  };
  const handleCabinetPriceChange = (e) => {
    let value = e.target.value;
    let priceString = value;
    if (!priceString.includes("$")) {
      priceString = "$" + priceString;
    }
    let otherPriceInt = parseInt(cabinetState.otherPrice.replace(/[$,]+/g, ""));
    let total =
      "$" + otherPriceInt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

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
      totalPdf: cabinetState.totalPrice,
      lineItemsDescPdf: cabinetState.lineItemsDesc,
      lineItemsCostPdf: cabinetState.lineItemsCost,
      notesPdf: cabinetState.notes,
    };
    console.log("REQUEST BODY:" + JSON.stringify(fields));

    postEstimateToDB(
      cabinetState.clientName,
      cabinetState.clientPhone,
      cabinetState.clientEmail,
      cabinetState.clientAddress,
      "CABINET",
      coordsState.longitude,
      coordsState.latitude
    );
    postEsimtate(
      "CabinetServiceTemplateForm.pdf",
      "CabinetEstimates",
      outputFileName,
      fields
    ).then((response) => {
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

  const handleLineItemFormatChange = (e) => {
    let itemsTotal = 0;
    for (var i = 0; i < cabinetState.lineItems.length; i++) {
      itemsTotal += parseInt(
        cabinetState.lineItems[i]["cost"].replace(/[$,]+/g, "")
      );
    }
    let total =
      "$" + itemsTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    let itemsTotalFormat =
      "$" + itemsTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    let formattedItemsDesc = "";
    let formattedItemsCost = "";

    if (cabinetState.lineItems[0].description !== "") {
      cabinetState.lineItems.forEach((lineItem, index) => {
        //First Item
        if (index === 0) {
          formattedItemsDesc = lineItem.description;
          formattedItemsCost = lineItem.cost;
        } else {
          //Every other item
          let lineHeight = Math.floor(lineItem.description.length / 30);
          formattedItemsDesc =
            formattedItemsDesc + "\n\n" + lineItem.description;
          formattedItemsCost =
            formattedItemsCost + "\n".repeat(lineHeight + 2) + lineItem.cost;
        }
      });
    }
    setCabinetState((prevState) => ({
      ...prevState,
      lineItemsDesc: formattedItemsDesc,
      lineItemsCost: formattedItemsCost,
      totalPrice: total,
      otherPrice: itemsTotalFormat,
    }));
  };

  const handleSubmit = () => {
    if (cabinetState.clientAddress !== "") {
      getCoordsFromAddress(cabinetState.clientAddress).then((response) => {
        if (response.status === 200) {
          let results = response.data.results;
          setCoordsState(() => ({
            longitude: results[0].geometry.location.lng.toString(),
            latitude: results[0].geometry.location.lat.toString(),
          }));
        } else {
          console.log("ERROR");
        }
      });
    } else {
      createEstimate();
    }
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
            <Col xs="3">
              <Form.Control
                name="openings"
                type="number"
                placeholder="# of Openings"
                required
                onChange={handleOpeningsChange}
              />
            </Col>
            <Col xs="3">
              <Form.Label>Price:</Form.Label>
            </Col>
            <Col xs="3">
              <Form.Control
                name="cabinetPrice"
                type="text"
                readOnly
                value={cabinetState.cabinetPrice}
                onChange={handleCabinetPriceChange}
              />
            </Col>
          </Form.Row>
          <br />
          <InteriorLineItems
            lineItems={cabinetState.lineItems}
            setLineItems={setLineItems}
            handleLineItemFormatChange={handleLineItemFormatChange}
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
                name="notes"
                value={cabinetState.notes}
                as="textarea"
                rows={3}
                onChange={handleStateChange}
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
