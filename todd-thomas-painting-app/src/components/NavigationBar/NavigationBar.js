import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import styled from "styled-components";

const Styles = styled.div`
  .navbar {
    background-color: #1acaed;
  }
  .navbar-brand{
    color: #efefef;
    font-size: 2.2em;
    &:hover {
      color: black;
    }
    font-family: 'Alfa Slab One';
  }
  .navbar-nav .nav-link {
    color: #efefef;
    font-size: 1.8em;
    &:hover {
      color: black;
    }
  }
`;
export const NavigationBar = () => {
  return (
    <Styles>
      <Navbar expand="lg">
        <Navbar.Brand href="/"><img src="ttp-logo.png" width="80px" /></Navbar.Brand>
        <Navbar.Toggle aria-controls= "basic-navbar-nav"/>
        <Navbar.Collapse id = "basic-navbar-nav">
            <Nav className = "ml-auto">
                <Nav.Item><Nav.Link href ="/exterior-estimate">Exterior</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link href ="/interior-estimate">Interior</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link href ="/cabinet-estimate">Cabinet</Nav.Link></Nav.Item>
            </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Styles>
  );
};
