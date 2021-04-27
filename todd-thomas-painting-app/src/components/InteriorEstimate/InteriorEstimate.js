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
    interiorItems: [],
    interiorItemsFormatted: "",
  });
  //METHODS

  const handleStateChange = (e) => {
    const { name, value } = e.target;
    setInteriorState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
          <hr />
          <Form.Row>
            <Col xs="4">
              <Form.Label>Entry: </Form.Label>
            </Col>
            <Col xs="7">
              <Form.Control
                name="entry"
                type="number"
                required
                onChange={handleStateChange}
              />
            </Col>
          </Form.Row>
          <br />
          <Form.Row>
            <Col xs="4">
              <Form.Label>Formal Living Room: </Form.Label>
            </Col>
            <Col xs="7">
              <Form.Control
                name="formalLivingRoom"
                type="number"
                required
                onChange={handleStateChange}
              />
            </Col>
          </Form.Row>
          <br />
          <Form.Row>
            <Col xs="4">
              <Form.Label>Formal Dining Room: </Form.Label>
            </Col>
            <Col xs="7">
              <Form.Control
                name="formalDiningRoom"
                type="number"
                required
                onChange={handleStateChange}
              />
            </Col>
          </Form.Row>
          <br />
          <Form.Row>
            <Col xs="4">
              <Form.Label>Kitchen: </Form.Label>
            </Col>
            <Col xs="7">
              <Form.Control
                name="kitchen"
                type="number"
                required
                onChange={handleStateChange}
              />
            </Col>
          </Form.Row>
          <br />
          <Form.Row>
            <Col xs="4">
              <Form.Label>Kitchen Eating Area: </Form.Label>
            </Col>
            <Col xs="7">
              <Form.Control
                name="kitchenEatingArea"
                type="number"
                required
                onChange={handleStateChange}
              />
            </Col>
          </Form.Row>
          <br />
          <Form.Row>
            <Col xs="4">
              <Form.Label>Kitchen Pantry: </Form.Label>
            </Col>
            <Col xs="7">
              <Form.Control
                name="kitchenPantry"
                type="number"
                required
                onChange={handleStateChange}
              />
            </Col>
          </Form.Row>
          <br />
          <Form.Row>
            <Col xs="4">
              <Form.Label>Family Room: </Form.Label>
            </Col>
            <Col xs="7">
              <Form.Control
                name="familyRoom"
                type="number"
                required
                onChange={handleStateChange}
              />
            </Col>
          </Form.Row>
          <br />
          <Form.Row>
            <Col xs="4">
              <Form.Label>Master Bedroom: </Form.Label>
            </Col>
            <Col xs="7">
              <Form.Control
                name="masterBedroom"
                type="number"
                required
                onChange={handleStateChange}
              />
            </Col>
          </Form.Row>
          <br />
          <Form.Row>
            <Col xs="4">
              <Form.Label>Master Bathroom: </Form.Label>
            </Col>
            <Col xs="7">
              <Form.Control
                name="masterBathroom"
                type="number"
                required
                onChange={handleStateChange}
              />
            </Col>
          </Form.Row>
          <br />
          <Form.Row>
            <Col xs="4">
              <Form.Label>Master Closet: </Form.Label>
            </Col>
            <Col xs="7">
              <Form.Control
                name="masterCloset"
                type="number"
                required
                onChange={handleStateChange}
              />
            </Col>
          </Form.Row>
          <br />
          <Form.Row>
            <Col xs="4">
              <Form.Label>Office: </Form.Label>
            </Col>
            <Col xs="7">
              <Form.Control
                name="Office"
                type="number"
                required
                onChange={handleStateChange}
              />
            </Col>
          </Form.Row>
          <br />
          <Form.Row>
            <Col xs="4">
              <Form.Label>Bathroom #2: </Form.Label>
            </Col>
            <Col xs="7">
              <Form.Control
                name="Bathroom2"
                type="number"
                required
                onChange={handleStateChange}
              />
            </Col>
          </Form.Row>
          <br />
          <Form.Row>
            <Col xs="4">
              <Form.Label>Bathroom #3: </Form.Label>
            </Col>
            <Col xs="7">
              <Form.Control
                name="Bathroom3"
                type="number"
                required
                onChange={handleStateChange}
              />
            </Col>
          </Form.Row>
          <br />
          <Form.Row>
            <Col xs="4">
              <Form.Label>Bathroom #4: </Form.Label>
            </Col>
            <Col xs="7">
              <Form.Control
                name="Bathroom4"
                type="number"
                required
                onChange={handleStateChange}
              />
            </Col>
          </Form.Row>
          <br />
          <Form.Row>
            <Col xs="4">
              <Form.Label>Bathroom #5: </Form.Label>
            </Col>
            <Col xs="7">
              <Form.Control
                name="Bathroom5"
                type="number"
                required
                onChange={handleStateChange}
              />
            </Col>
          </Form.Row>
          <br />
          <Form.Row>
            <Col xs="4">
              <Form.Label>Guest Bedroom #2: </Form.Label>
            </Col>
            <Col xs="7">
              <Form.Control
                name="guestBedroom2"
                type="number"
                required
                onChange={handleStateChange}
              />
            </Col>
          </Form.Row>
          <br />
          <Form.Row>
            <Col xs="4">
              <Form.Label>Guest Bedroom #2 Closet: </Form.Label>
            </Col>
            <Col xs="7">
              <Form.Control
                name="guestBedroom2Closet"
                type="number"
                required
                onChange={handleStateChange}
              />
            </Col>
          </Form.Row>
          <br />
          <Form.Row>
            <Col xs="4">
              <Form.Label>Guest Bedroom #3: </Form.Label>
            </Col>
            <Col xs="7">
              <Form.Control
                name="guestBedroom3"
                type="number"
                required
                onChange={handleStateChange}
              />
            </Col>
          </Form.Row>
          <br />
          <Form.Row>
            <Col xs="4">
              <Form.Label>Guest Bedroom #3 Closet: </Form.Label>
            </Col>
            <Col xs="7">
              <Form.Control
                name="guestBedroom3Closet"
                type="number"
                required
                onChange={handleStateChange}
              />
            </Col>
          </Form.Row>
          <br />
          <Form.Row>
            <Col xs="4">
              <Form.Label>Guest Bedroom #4: </Form.Label>
            </Col>
            <Col xs="7">
              <Form.Control
                name="guestBedroom4"
                type="number"
                required
                onChange={handleStateChange}
              />
            </Col>
          </Form.Row>
          <br />
          <Form.Row>
            <Col xs="4">
              <Form.Label>Guest Bedroom #4 Closet: </Form.Label>
            </Col>
            <Col xs="7">
              <Form.Control
                name="guestBedroom4Closet"
                type="number"
                required
                onChange={handleStateChange}
              />
            </Col>
          </Form.Row>
          <br />
          <Form.Row>
            <Col xs="4">
              <Form.Label>Guest Bedroom #5: </Form.Label>
            </Col>
            <Col xs="7">
              <Form.Control
                name="guestBedroom5"
                type="number"
                required
                onChange={handleStateChange}
              />
            </Col>
          </Form.Row>
          <br />
          <Form.Row>
            <Col xs="4">
              <Form.Label>Guest Bedroom #5 Closet: </Form.Label>
            </Col>
            <Col xs="7">
              <Form.Control
                name="guestBedroom5Closet"
                type="number"
                required
                onChange={handleStateChange}
              />
            </Col>
          </Form.Row>
          <br />
          <Form.Row>
            <Col xs="4">
              <Form.Label>Hallway #1: </Form.Label>
            </Col>
            <Col xs="7">
              <Form.Control
                name="hallway1"
                type="number"
                required
                onChange={handleStateChange}
              />
            </Col>
          </Form.Row>
          <br />
          <Form.Row>
            <Col xs="4">
              <Form.Label>Hallway #2: </Form.Label>
            </Col>
            <Col xs="7">
              <Form.Control
                name="hallway2"
                type="number"
                required
                onChange={handleStateChange}
              />
            </Col>
          </Form.Row>
          <br />
          <Form.Row>
            <Col xs="4">
              <Form.Label>Laundry Room: </Form.Label>
            </Col>
            <Col xs="7">
              <Form.Control
                name="laudryRoom"
                type="number"
                required
                onChange={handleStateChange}
              />
            </Col>
          </Form.Row>
          <br />
          <Form.Row>
            <Col xs="4">
              <Form.Label>Garage Walls: </Form.Label>
            </Col>
            <Col xs="7">
              <Form.Control
                name="garageWalls"
                type="number"
                required
                onChange={handleStateChange}
              />
            </Col>
          </Form.Row>
          <br />
          <Form.Row>
            <Col xs="4">
              <Form.Label>Garage Ceiling: </Form.Label>
            </Col>
            <Col xs="7">
              <Form.Control
                name="garageCeiling"
                type="number"
                required
                onChange={handleStateChange}
              />
            </Col>
          </Form.Row>
          <br />
          <Form.Row>
            <Col xs="4">
              <Form.Label>Total Passage Doors: </Form.Label>
            </Col>
            <Col xs="7">
              <Form.Control
                name="passageDoors"
                type="number"
                required
                onChange={handleStateChange}
              />
            </Col>
          </Form.Row>
          <br />
          <Form.Row>
            <Col xs="4">
              <Form.Label>Total Closet Doors: </Form.Label>
            </Col>
            <Col xs="7">
              <Form.Control
                name="closetDoors"
                type="number"
                required
                onChange={handleStateChange}
              />
            </Col>
          </Form.Row>

          <br />
          <LineItems lineItems={interiorState.lineItems} />
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
