import React, { useState, useEffect, useRef } from "react";
import { Form, Button, Col } from "react-bootstrap";
import Layout from "../Layout/Layout";
import { LineItems } from "../LineItems/LineItems";
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

export const ExteriorEstimate = () => {
  //PRICING CONSTS
  const deluxeRate = 1.17;
  const ultimateRate = 1.22;
  const maximumRate = 1.3;
  //STATE VARIABLES
  const [exteriorState, setExteriorState] = useState({
    clientName: "",
    clientAddress: "",
    clientPhone: "",
    clientEmail: "",
    homeSqft: -1,
    deluxePackagePrice: 0,
    ultimatePackagePrice: 0,
    maximumPackagePrice: 0,
    note: "",
    noteTemp: "",
    responseData: {},
  });
  const [lineItems, setLineItems] = useState([{ description: "", cost: "" }]);
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
  const handleSqftChange = (e) => {
    let value = e.target.value;
    //Set Sqft
    setExteriorState((prevState) => ({
      ...prevState,
      homeSqft: value,
      deluxePackagePrice:
        "$" +
        Math.round(value * deluxeRate)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      ultimatePackagePrice:
        "$" +
        Math.round(value * ultimateRate)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      maximumPackagePrice:
        "$" +
        Math.round(value * maximumRate)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
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

  function createEstimate() {
    let date = getDate();
    let outputFileName = exteriorState.clientName.replace(" ", "") + "-" + date;
    let fields = {
      clientNamePdf: exteriorState.clientName,
      clientAddressPdf: exteriorState.clientAddress,
      clientEmailPdf: exteriorState.clientEmail,
      clientPhonePdf: exteriorState.clientPhone,
      deluxePackagePricePdf: exteriorState.deluxePackagePrice,
      ultimatePackagePricePdf: exteriorState.ultimatePackagePrice,
      maximumPackagePricePdf: exteriorState.maximumPackagePrice,
      notes: exteriorState.note,
    };

    postEstimateToDB(
      exteriorState.clientName,
      exteriorState.clientPhone,
      exteriorState.clientEmail,
      exteriorState.clientAddress,
      "EXTERIOR",
      coordsState.longitude,
      coordsState.latitude
    );

    postEsimtate(
      "ExteriorTemplateForm.pdf",
      "ExteriorEstimates",
      outputFileName,
      fields
    ).then((response) => {
      if (response.status !== 200) {
        //verify succesful call
        setExteriorState((prevState) => ({
          ...prevState,
          responseData: { error: true },
        }));
      } else {
        setExteriorState((prevState) => ({
          ...prevState,
          responseData: { response: response.status },
        }));
        let link =
          "https://todd-thomas-painting.s3-us-west-2.amazonaws.com/ExteriorEstimates/" +
          outputFileName +
          ".pdf";
        console.log(JSON.stringify(coordsState));
        window.open(link);
      }
    });
  }

  const handleNoteChange = (e) => {
    const { name, value } = e.target;

    let note = "";
    if (lineItems[0].description !== "") {
      note = "Additional Items Prices Seperately:\n";
      lineItems.forEach((lineItem) => {
        note = note + "\n" + lineItem.description + "\t\t " + lineItem.cost;
      });
      note = note + "\n\n";
    }
    if (exteriorState.noteTemp !== "" && name === "noteTemp") {
      note = note + "Notes:\n" + value;
    }
    if (name === "noteTemp") {
      setExteriorState((prevState) => ({
        ...prevState,
        note: note,
        noteTemp: value,
      }));
    } else {
      setExteriorState((prevState) => ({
        ...prevState,
        note: note,
      }));
    }

    console.log("NOTE CHANGE: " + JSON.stringify(exteriorState));
  };

  const handleSubmit = () => {
    if (exteriorState.clientAddress !== "") {
      getCoordsFromAddress(exteriorState.clientAddress).then((response) => {
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
        <h1>Exterior Estimate</h1>
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
                value={exteriorState.clientName}
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
              <Form.Label>Home Sqft: </Form.Label>
            </Col>
            <Col xs="3">
              <Form.Control
                name="homeSqft"
                type="number"
                placeholder="Enter SQFT"
                required
                onChange={handleStateChange}
              />
            </Col>
          </Form.Row>
          <br />
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Deluxe Package</Form.Label>
              <Form.Control
                name="deluxePackagePrice"
                type="text"
                value={exteriorState.deluxePackagePrice}
                onChange={handleStateChange}
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Ultimate Package</Form.Label>
              <Form.Control
                name="ultimatePackagePrice"
                type="text"
                value={exteriorState.ultimatePackagePrice}
                onChange={handleStateChange}
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Maximum Package</Form.Label>
              <Form.Control
                name="maximumPackagePrice"
                type="text"
                value={exteriorState.maximumPackagePrice}
                onChange={handleStateChange}
              />
            </Form.Group>
          </Form.Row>
          <LineItems
            lineItems={lineItems}
            setLineItems={setLineItems}
            handleNoteChange={handleNoteChange}
          />
          <br />
          <Form.Row>
            <Col xs="8">
              <Form.Label>Additional Notes</Form.Label>
              <Form.Control
                name="noteTemp"
                value={exteriorState.noteTemp}
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
