import React, { useState, useEffect } from "react";
import { Accordion, Card, Button } from "react-bootstrap";
import styled from "styled-components";
import { getEstimates } from "../../utilities/api";
import { compareDatesS3Objects, formatDate } from "../../utilities/util";

const Styles = styled.div`
  margin-top: 2%;
  margin-left: 3%;
`;
const s3Url = "https://todd-thomas-painting.s3.us-west-2.amazonaws.com/";
export const PastEstimates = () => {
  //STATE VARIABLES
  const [estimatesState, setEstimatesState] = useState({});
  useEffect(() => {
    getEstimates()
      .then((response) => {
        if (response.data.statusCode !== 200) {
          //verify succesful call
          setEstimatesState({ error: true });
        } else {
          //Sort by date
          let exteriors = response.data.body.Exterior.Contents.sort(
            compareDatesS3Objects
          );
          let services = response.data.body.Service.Contents.sort(
            compareDatesS3Objects
          );
          let cabinets = response.data.body.Cabinet.Contents.sort(
            compareDatesS3Objects
          );
          let invoices = response.data.body.Invoices.Contents.sort(
            compareDatesS3Objects
          );
          setEstimatesState({ exteriors, services, cabinets, invoices });
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
      <Styles>
        <h1>Past Estimates</h1>
        <br />
        <Accordion>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} eventKey="0">
                Exterior Estimates
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                {estimatesState.exteriors.map((element, index) => (
                  <p>
                    <a
                      key={`exterior-estimate-${index}`}
                      href={s3Url + element.Key}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {element.Key.toString().replace("ExteriorEstimates/", "")}
                    </a>
                    {element.Key === "ExteriorEstimates/"
                      ? null
                      : "\tCreated: \t" + formatDate(element.LastModified)}
                  </p>
                ))}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <br />
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} eventKey="1">
                Service Estimates
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                {estimatesState.services.map((element, index) => (
                  <p>
                    <a
                      key={`service-estimate-${index}`}
                      href={s3Url + element.Key}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {element.Key.toString().replace("InteriorEstimates/", "")}
                    </a>
                    {element.Key === "InteriorEstimates/"
                      ? null
                      : "\tCreated: \t" + formatDate(element.LastModified)}
                  </p>
                ))}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <br />
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} eventKey="2">
                Cabinet Estimates
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="2">
              <Card.Body>
                {estimatesState.cabinets.map((element, index) => (
                  <p>
                    <a
                      key={`cabinet-estimate-${index}`}
                      href={s3Url + element.Key}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {element.Key.toString().replace("CabinetEstimates/", "")}
                    </a>
                    {element.Key === "CabinetEstimates/"
                      ? null
                      : "\tCreated: \t" + formatDate(element.LastModified)}
                  </p>
                ))}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <br />
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} eventKey="3">
                Invoices
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="3">
              <Card.Body>
                {estimatesState.invoices.map((element, index) => (
                  <p>
                    <a
                      key={`invoices-${index}`}
                      href={s3Url + element.Key}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {element.Key.toString().replace("Invoices/", "")}
                    </a>
                    {element.Key === "Invoices/"
                      ? null
                      : "\tCreated: \t" + formatDate(element.LastModified)}
                  </p>
                ))}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </Styles>
    );
  }
};
