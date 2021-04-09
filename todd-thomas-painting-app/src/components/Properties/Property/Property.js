import React, { useState } from "react";
import { Card, Modal } from "react-bootstrap";
import styled from "styled-components";
import { filterProperties, getPrice } from "../../../utilities/util";

const Styles = styled.div`
  margin-top: 2%;
  cursor: pointer;
  .priceLabel {
    color: white;
  }
`;

export const Property = (props) => {
  const [show, setShow] = useState(false);

  //Filters out Properties not matching filter criteria
  if (!filterProperties(props.state, props.item)) {
    return null;
  }
  let pricePerSqft = Math.round(props.item.price / props.item.sqft);
  //Creates Cards and Modals for properties
  return (
    <Styles>
      <Card
        style={{ width: "18rem" }}
        key={props.item.propertyId}
        onClick={() => setShow(true)}
      >
        <Card.Img variant="top" src={props.item.imgAddress} />
        <Card.ImgOverlay>
          <Card.Title className="priceLabel">
            <strong>{getPrice(props.item.price)}</strong>
          </Card.Title>
        </Card.ImgOverlay>
        <Card.Body>
          <Card.Title>{props.item.address}</Card.Title>
          <Card.Text>
            {`${props.item.city}, ${props.item.state} ${props.item.zipcode}`}
          </Card.Text>
          <p>{`Beds: ${props.item.bedrooms} Baths: ${props.item.bathrooms}`}</p>
        </Card.Body>
      </Card>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        size="lg"
        className="propertyModal"
      >
        <Modal.Header closeButton>
          <Modal.Title>{`${props.item.address}, ${props.item.city} ${props.item.zipcode}`}</Modal.Title>
        </Modal.Header>
        <Card.Img variant="top" src={props.item.imgAddress} />
        <div style={{ marginLeft: "20px" }}>
          <p className="propertyModal">{`Beds: ${props.item.bedrooms} Baths: ${props.item.bathrooms}`}</p>
          <p>{`First Floor Primary: ${
            props.item.firstFloorPrimary ? "YES" : "NO"
          }`}</p>
          <p>{`HVAC was last replaced in: ${props.item.hvacYear}`}</p>
          <p>{`Water Heater was last replaced in: ${props.item.waterHeaterYear}`}</p>
          <p>{`Price Per Square Foot : $${pricePerSqft}.00`}</p>
          <p>
            <strong>Price: {getPrice(props.item.price)}</strong>
          </p>
        </div>
        <Modal.Footer>{props.item.propertyId}</Modal.Footer>
      </Modal>
    </Styles>
  );
};
