import React, { useState, useEffect } from "react";
import { Accordion, Card, Button } from "react-bootstrap";
import Layout from "../Layout/Layout";
import styled from "styled-components";
import { getEstimates } from "../../utilities/api";

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
const s3Url = "https://todd-thomas-painting.s3.us-west-2.amazonaws.com/";
let y;
export const PastEstimates = () => {
  //STATE VARIABLES
  const [estimatesState, setEstimatesState] = useState({});
  useEffect(() => {
    getEstimates()
      .then((response) => {
        console.log(JSON.stringify(response));
        if (response.data.statusCode !== 200) {
          //verify succesful call
          setEstimatesState({ error: true });
        } else {
          setEstimatesState(response.data.body);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (Object.keys(estimatesState).length === 0) {
    //Waiting for property data to be returned
    return <p>LOADING DATA...</p>;
  } else {
    return (
      <Layout>
        <Styles>
          <h1>Past Estimates</h1>
          <br />
          <Accordion>
            <Card style={{ width: "80rem" }}>
              <Card.Header>
                <Accordion.Toggle
                  as={Button}
                  eventKey="0"
                  style={{ width: "50rem" }}
                >
                  Exterior Estimates
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  {estimatesState.Exterior.Contents.map((element, index) => (
                    <p>
                      <a
                        key={`exterior-estimate-${index}`}
                        href={s3Url + element.Key}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {element.Key.toString().replace(
                          "ExteriorEstimates/",
                          ""
                        )}
                      </a>
                    </p>
                  ))}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <br />
            <Card style={{ width: "80rem" }}>
              <Card.Header>
                <Accordion.Toggle
                  as={Button}
                  eventKey="1"
                  style={{ width: "50rem" }}
                >
                  Service Estimates
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  {estimatesState.Service.Contents.map((element, index) => (
                    <p>
                      <a
                        key={`service-estimate-${index}`}
                        href={s3Url + element.Key}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {element.Key.toString().replace(
                          "InteriorEstimates/",
                          ""
                        )}
                      </a>
                    </p>
                  ))}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <br />
            <Card style={{ width: "80rem" }}>
              <Card.Header>
                <Accordion.Toggle
                  as={Button}
                  eventKey="2"
                  style={{ width: "50rem" }}
                >
                  Cabinet Estimates
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="2">
                <Card.Body>
                  {estimatesState.Cabinet.Contents.map((element, index) => (
                    <p>
                      <a
                        key={`cabinet-estimate-${index}`}
                        href={s3Url + element.Key}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {element.Key.toString().replace(
                          "CabinetEstimates/",
                          ""
                        )}
                      </a>
                    </p>
                  ))}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <br />
            <Card style={{ width: "80rem" }}>
              <Card.Header>
                <Accordion.Toggle
                  as={Button}
                  eventKey="3"
                  style={{ width: "50rem" }}
                >
                  Invoices
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="3">
                <Card.Body>
                  {estimatesState.Invoices.Contents.map((element, index) => (
                    <p>
                      <a
                        key={`invoices-${index}`}
                        href={s3Url + element.Key}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {element.Key.toString().replace("Invoices/", "")}
                      </a>
                    </p>
                  ))}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Styles>
      </Layout>
    );
  }
};
