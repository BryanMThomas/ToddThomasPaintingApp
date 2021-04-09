import React from "react";
import { Form } from "react-bootstrap";
import styled from "styled-components";

const Styles = styled.div`
  .headerLabel {
    margin-top: 5px;
  }
  .otherLabel {
    margin-top: 15px;
  }
  .selector {
    margin-top: 5px;
    margin-left: 5px;
  }
  .checkbox {
    margin-top: 5px;
    margin-left: 5px;
  }
`;
export const Filter = (props) => {
  const handleStateChange = (e) => {
    if (e.target.type === "checkbox") {
      const { name, checked } = e.target;
      props.setState((prevState) => ({
        ...prevState,
        [name]: checked,
      }));
    } else {
      const { name, value } = e.target;
      props.setState((prevState) => ({
        ...prevState,
        [name]: value.replace(/\$|,/g, ""),
      }));
    }
  };

  return (
    <Styles>
      <Form inline className="selecter">
        <Form.Group controlId="priceSelect">
          <Form.Label> Min Price </Form.Label>
          <Form.Control
            as="select"
            defaultValue="No Min"
            className="selector"
            name="minPrice"
            onChange={handleStateChange}
          >
            <option>No Min</option>
            <option>$200,000</option>
            <option>$300,000</option>
            <option>$400,000</option>
            <option>$500,000</option>
            <option>$600,000</option>
          </Form.Control>
          <Form.Label> Max Price </Form.Label>
          <Form.Control
            as="select"
            defaultValue="No Max"
            className="selector"
            name="maxPrice"
            onChange={handleStateChange}
          >
            <option>No Max</option>
            <option>$300,000</option>
            <option>$400,000</option>
            <option>$500,000</option>
            <option>$600,000</option>
            <option>$700,000</option>
          </Form.Control>
        </Form.Group>
      </Form>
      <Form.Label className="headerLabel"> Beds </Form.Label>
      <Form inline>
        <Form.Group controlId="bedSelect">
          <Form.Control
            as="select"
            defaultValue="No Min"
            className="selector"
            name="minBeds"
            onChange={handleStateChange}
          >
            <option>No Min</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </Form.Control>
          <Form.Control
            as="select"
            defaultValue="No Max"
            className="selector"
            name="maxBeds"
            onChange={handleStateChange}
          >
            <option>No Max</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Control>
        </Form.Group>
      </Form>
      <Form.Label className="headerLabel"> Bath </Form.Label>
      <Form inline>
        <Form.Group controlId="bathSelect">
          <Form.Control
            as="select"
            defaultValue="No Min"
            className="selector"
            name="minBaths"
            onChange={handleStateChange}
          >
            <option> No Min </option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </Form.Control>
        </Form.Group>
      </Form>
      <Form>
        <Form.Label className="otherLabel"> Other Options </Form.Label>
        <Form.Check
          className="checkbox"
          type="checkbox"
          label="First Floor Primary"
          name="firstFloorPrimary"
          onChange={handleStateChange}
        />
        <Form.Group controlId="formBasicRange">
          <Form.Label className="headerLabel">
            Max HVAC Age <strong> {props.state.hvacAgeRange} </strong> years
          </Form.Label>
          <Form.Control
            name="hvacAgeRange"
            type="range"
            min={1}
            max={10}
            defaultValue={10}
            onChange={handleStateChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicRange">
          <Form.Label className="headerLabel">
            Max Water Heater Age{" "}
            <strong> {props.state.waterHeaterAgeRange} </strong>
            years
          </Form.Label>
          <Form.Control
            name="waterHeaterAgeRange"
            type="range"
            min={1}
            max={10}
            defaultValue={10}
            onChange={handleStateChange}
          />
        </Form.Group>
        </Form>
        <Form inline>
        <Form.Label className="headerLabel"> Price Per Square Foot </Form.Label>
        <Form.Group controlId="priceSqftSelect">
          <Form.Control
            as="select"
            defaultValue="No Min"
            className="selector"
            name="minPriceSqft"
            onChange={handleStateChange}
          >
            <option>No Min</option>
            <option>$150</option>
            <option>$200</option>
            <option>$250</option>
          </Form.Control>
          <Form.Control
            as="select"
            defaultValue="No Max"
            className="selector"
            name="maxPriceSqft"
            onChange={handleStateChange}
          >
            <option>No Max</option>
            <option>$200</option>
            <option>$250</option>
            <option>$300</option>
          </Form.Control>
        </Form.Group>
        </Form>
    </Styles>
  );
};
