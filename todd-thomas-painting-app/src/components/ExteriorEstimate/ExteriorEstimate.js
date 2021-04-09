import React, { useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import Layout from "../Layout/Layout";
import styled from "styled-components";

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

  const submit = () => {};

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
                type="text"
                placeholder="Enter Client Name"
                required
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
                type="text"
                placeholder="Enter Client Address"
                required
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
                type="email"
                placeholder="Enter Client Email"
                required
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
                type="text"
                placeholder="Enter Client Phone"
                required
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
              <Form.Control type="number" placeholder="Enter SQFT" required />
            </Col>
          </Form.Row>
          <br />
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Deluxe Package</Form.Label>
              <Form.Control />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Ultimate Package</Form.Label>
              <Form.Control />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Maximum Package</Form.Label>
              <Form.Control />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Col xs="8">
              <Form.Label>Additional Notes</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Col>
          </Form.Row>
          <br />
          <Button variant="primary" type="submit">
            Download &darr;
          </Button>
        </Form>
      </Styles>
    </Layout>
  );
};
