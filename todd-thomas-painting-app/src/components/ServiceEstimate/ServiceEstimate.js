import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import Layout from "../Layout/Layout";
import { InteriorLineItems } from "../InteriorLineItems/InteriorLineItems";
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
export const ServiceEstimate = () => {
  //STATE VARIABLES
  const [serviceState, setServiceState] = useState({
    clientName: "",
    clientAddress: "",
    clientPhone: "",
    clientEmail: "",
    totalPrice: "0",
    notes: "",
    lineItemsDesc: "",
    lineItemsCost: "",
    responseData: {},
    lineItems: [{ description: "", cost: "" }],
  });
  //METHODS

  const handleStateChange = (e) => {
    const { name, value } = e.target;
    setServiceState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const setLineItems = (list) => {
    let itemsTotal = 0;
    for (var i = 0; i < list.length; i++) {
      itemsTotal += parseInt(list[i]["cost"].replace(/[$,]+/g, ""));
    }
    let total =
      "$" + itemsTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    setServiceState((prevState) => ({
      ...prevState,
      lineItems: list,
      totalPrice: total,
    }));
  };

  const handleLineItemFormatChange = (e) => {
    let itemsTotal = 0;
    for (var i = 0; i < serviceState.lineItems.length; i++) {
      itemsTotal += parseInt(
        serviceState.lineItems[i]["cost"].replace(/[$,]+/g, "")
      );
    }
    let total =
      "$" + itemsTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    let formattedItemsDesc = "";
    let formattedItemsCost = "";
    if (serviceState.lineItems[0].description !== "") {
      serviceState.lineItems.forEach((lineItem) => {
        formattedItemsDesc = formattedItemsDesc + "\n" + lineItem.description;
        formattedItemsCost = formattedItemsCost + "\n" + lineItem.cost;
      });
    }
    setServiceState((prevState) => ({
      ...prevState,
      lineItemsDesc: formattedItemsDesc,
      lineItemsCost: formattedItemsCost,
      totalPrice: total,
    }));
  };

  function createEstimate() {
    let date = getDate();
    let outputFileName = serviceState.clientName.replace(" ", "") + "-" + date;
    let fields = {
      clientNamePdf: serviceState.clientName,
      clientAddressPdf: serviceState.clientAddress,
      clientEmailPdf: serviceState.clientEmail,
      clientPhonePdf: serviceState.clientPhone,
      totalPdf: serviceState.totalPrice,
      lineItemsDescPdf: serviceState.lineItemsDesc,
      lineItemsCostPdf: serviceState.lineItemsCost,
      notesPdf: serviceState.notes,
    };
    console.log("REQUEST BODY:" + JSON.stringify(fields));

    postEsimtate(
      "ServiceTemplateForm.pdf",
      "InteriorEstimates",
      outputFileName,
      fields
    ).then((response) => {
      if (response.status !== 200) {
        //verify succesful call
        setServiceState((prevState) => ({
          ...prevState,
          responseData: { error: true },
        }));
      } else {
        setServiceState((prevState) => ({
          ...prevState,
          responseData: { response: response.status },
        }));
        let link =
          "https://todd-thomas-painting.s3-us-west-2.amazonaws.com/InteriorEstimates/" +
          outputFileName +
          ".pdf";
        window.open(link);
      }
    });
  }
  const handleSubmit = () => {
    createEstimate();
  };

  //DOM STRUCTURE

  return (
    <Layout>
      <Styles>
        <h1>Service Estimate</h1>
        <br />
        <Form>
          <Form.Row>
            <Col xs="4">
              <Form.Label>Client Name: </Form.Label>
            </Col>
            <Col>
              <Form.Control
                name="clientName"
                type="text"
                placeholder="Enter Client Name"
                onChange={handleStateChange}
                value={serviceState.clientName}
              />
            </Col>
          </Form.Row>
          <br />
          <Form.Row>
            <Col xs="4">
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
            <Col xs="4">
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
            <Col xs="4">
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
          <InteriorLineItems
            lineItems={serviceState.lineItems}
            setLineItems={setLineItems}
            handleLineItemFormatChange={handleLineItemFormatChange}
          />
          <br />
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Total Price</Form.Label>
              <Form.Control
                name="totalPrice"
                type="text"
                readOnly
                value={serviceState.totalPrice}
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
                value={serviceState.notes}
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
