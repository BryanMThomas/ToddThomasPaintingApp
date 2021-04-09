import React, { useState } from "react";
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
  const [state, setState] = useState({
    minPrice: 0,
    maxPrice: "No Max",
    minBeds: 0,
    maxBeds: "No Max",
    minBaths: 0,
    firstFloorPrimary: false,
    hvacAgeRange: 10,
    waterHeaterAgeRange: 10,
    priceSqftMin: 0,
    priceSQFtMax: "No Max",
  });

  return (
    <Styles>
      <div> Exterior ExteriorEstimate</div>
    </Styles>
  );
};
