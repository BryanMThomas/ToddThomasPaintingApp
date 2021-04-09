import React from "react";
import { Form, Button, Jumbotron, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Styles = styled.div`
  div {
    margin-top: 45px;
  }
  .jumbo {
    background: url(https://bryx-project.s3-us-west-2.amazonaws.com/homeImages/homePage.jpeg)
      no-repeat fixed center;
    background-size: auto 500px;
    color: #efefef;
    height: 500px;
    position: relative;
    z-index: -2;
    .container {
    }
  }
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
  }
  .searchButton {
    background-color: #800000;
    border: 1px solid gray;
    box-shadow: none;
    &:hover {
      background-color: gray;
      color: white;
    }
  }
  .searchForm {
    box-shadow: none;
    &:active {
      outline: none;
      box-shadow: none;
    }
    &:focus {
      outline: none;
      box-shadow: none;
    }
  }
`;
export const Search = () => {
  return (
    <Container>
      <Styles>
        <div>
          <Jumbotron fluid className="jumbo">
            <div className="overlay"></div>
            <Container>
              <h1>Find Your Dream Home</h1>
              <p>start your journey today</p>
            </Container>
          </Jumbotron>
          <Form>
            <Form.Group className="searchForm" controlId="addressSearch">
              <Form.Control
                className="searchForm"
                size="lg"
                type="text"
                placeholder="Enter an address, city, or ZIP code"
              />
            </Form.Group>
            <Link to="/listings">
              <Button
                className="searchButton"
                size="lg"
                variant="secondary"
                onClick={() => {}}
              >
                Search
              </Button>
            </Link>
          </Form>
        </div>
      </Styles>
    </Container>
  );
};
