import React from "react";
import { Form, Button, Col } from "react-bootstrap";
export const LineItems = (props) => {
  //METHODS
  const handleInputChange = (e, index) => {
    let { name, value } = e.target;
    const list = [...props.lineItems];
    if (name === "cost") {
      value = value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      if (!value.includes("$")) {
        value = "$" + value;
      }
      list[index][name] = value;
    } else {
      list[index][name] = value;
    }
    props.setLineItems(list);
    props.handleNoteChange(e);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    if (props.lineItems.length !== 1) {
      const list = [...props.lineItems];
      list.splice(index, 1);
      props.setLineItems(list);
    }
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    props.setLineItems([...props.lineItems, { description: "", cost: "" }]);
  };

  //DOM STRUCTURE

  return (
    <React.Fragment>
      <h4>Additional Line Items</h4>
      {props.lineItems.map((x, i) => {
        return (
          <Form>
            <Form.Row>
              <Col>
                <Form.Control
                  name="description"
                  type="text"
                  placeholder="Enter Description"
                  onChange={(e) => handleInputChange(e, i)}
                  value={x.description}
                />
              </Col>
              <Col xs="3">
                <Form.Control
                  name="cost"
                  type="text"
                  placeholder="Enter Cost"
                  onChange={(e) => handleInputChange(e, i)}
                  value={x.cost}
                />
              </Col>
              <Col>
                <Button onClick={() => handleRemoveClick(i)}>Remove</Button>
              </Col>
            </Form.Row>
            <br />
            {props.lineItems.length - 1 === i && (
              <Form.Row>
                <Button onClick={handleAddClick}>Add</Button>
              </Form.Row>
            )}
          </Form>
        );
      })}
    </React.Fragment>
  );
};
