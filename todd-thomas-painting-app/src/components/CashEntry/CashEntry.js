import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import Layout from "../Layout/Layout";
import styled from "styled-components";
import { postCash } from "../../utilities/api";

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
export const CashEntry = () => {
  const [cashState, setCashState] = useState({
    value: "",
    showSuccess: false,
    error: false,
  });

  const handleStateChange = (e) => {
    setCashState((prevState) => ({
      ...prevState,
      value: e.target.value,
    }));
  };
  const handleSubmit = () => {
    postCash(cashState.value).then((response) => {
      if (response.status !== 200) {
        //verify succesful call
        setCashState((prevState) => ({
          ...prevState,
          showSuccess: true,
        }));
      } else {
        setCashState((prevState) => ({
          ...prevState,
          error: true,
        }));
      }
    });
  };
  return (
    <Layout>
      <Styles>
        <h1>Cash Entry</h1>
        <br />
        <Form>
          <Form.Row>
            <Col xs="3">
              <Form.Label>Value: </Form.Label>
            </Col>
            <Col>
              <Form.Control
                name="cashValue"
                type="text"
                placeholder="Enter Value"
                onChange={handleStateChange}
                value={cashState.value}
              />
            </Col>
            <Button variant="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Form.Row>
          {cashState.showSuccess ? <Form.Label>Success!!!</Form.Label> : ""}
          {cashState.error ? (
            <Form.Label>There was a problem try again later</Form.Label>
          ) : (
            ""
          )}
        </Form>
      </Styles>
    </Layout>
  );
};
