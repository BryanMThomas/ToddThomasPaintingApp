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
export const InteriorEstimate = () => {
  //STATE VARIABLES
  const [interiorState, setInteriorState] = useState({
    clientName: "",
    clientAddress: "",
    clientPhone: "",
    clientEmail: "",
    totalPrice: "0",
    note: "",
    noteTemp: "",
    responseData: {},
    lineItems: [{ description: "", cost: "" }],
  });
  //METHODS

  const handleStateChange = (e) => {
    const { name, value } = e.target;
    setInteriorState((prevState) => ({
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

    setInteriorState((prevState) => ({
      ...prevState,
      lineItems: list,
      totalPrice: total,
    }));
  };

  const handleNoteChange = (e) => {
    let itemsTotal = 0;
    for (var i = 0; i < interiorState.lineItems.length; i++) {
      itemsTotal += parseInt(
        interiorState.lineItems[i]["cost"].replace(/[$,]+/g, "")
      );
    }
    let total =
      "$" + itemsTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    let itemsTotalFormat =
      "$" + itemsTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    let note = "";
    if (interiorState.lineItems[0].description !== "") {
      note = "Additional Items Priced Seperately:\n";
      interiorState.lineItems.forEach((lineItem) => {
        note = note + "\n" + lineItem.description + "\t\t " + lineItem.cost;
      });
      note = note + "\n\n";
    }

    const { name, value } = e.target;
    if (interiorState.noteTemp !== "" && name === "noteTemp") {
      note = note + "Notes:\n\n" + value;
    }
    if (name === "noteTemp") {
      setInteriorState((prevState) => ({
        ...prevState,
        note: note,
        noteTemp: value,
      }));
    } else {
      setInteriorState((prevState) => ({
        ...prevState,
        note: note,
        totalPrice: total,
        otherPrice: itemsTotalFormat,
      }));
    }
  };

  function createEstimate() {
    let date = getDate();
    let outputFileName = interiorState.clientName.replace(" ", "") + "-" + date;
    let fields = {
      clientNamePdf: interiorState.clientName,
      clientAddressPdf: interiorState.clientAddress,
      clientEmailPdf: interiorState.clientEmail,
      clientPhonePdf: interiorState.clientPhone,
      openingsPdf: interiorState.openings,
      totalPdf: interiorState.totalPrice,
      notesPdf: interiorState.note,
      interiorItemsPdf: interiorState.interiorItemsFormatted,
    };
    console.log("REQUEST BODY:" + JSON.stringify(fields));

    // postEsimtate("CabinetTemplateForm2.pdf","CabinetEstimates",outputFileName, fields).then((response) => {
    //   if (response.status !== 200) {
    //     //verify succesful call
    //     setCabinetState((prevState) => ({
    //       ...prevState,
    //       responseData: { error: true },
    //     }));
    //   } else {
    //     setCabinetState((prevState) => ({
    //       ...prevState,
    //       responseData: { response: response.status },
    //     }));
    //     let link =
    //       "https://todd-thomas-painting.s3-us-west-2.amazonaws.com/CabinetEstimates/" +
    //       outputFileName +
    //       ".pdf";
    //     window.open(link);
    //   }
    // });
  }
  const handleSubmit = () => {
    createEstimate();
  };

  //DOM STRUCTURE

  return (
    <Layout>
      <Styles>
        <h1>Interior Estimate</h1>
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
                value={interiorState.clientName}
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
            lineItems={interiorState.lineItems}
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
                value={interiorState.totalPrice}
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
                value={interiorState.noteTemp}
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
