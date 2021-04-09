import getAllPropertyData from "../../utilities/api";
import React, { useEffect, useState } from "react";
import { CardDeck } from "react-bootstrap";
import { Property } from "./Property/Property";
import styled from "styled-components";

const Styles = styled.div`
  width: 1000px;
`;

export const Properities = (props) => {
  let [responseData, setResponseData] = useState({});
  useEffect(() => {
    getAllPropertyData()
      .then((response) => {
        if (response.data.statusCode !== 200) {
          //verify succesful call
          setResponseData({ error: true });
        } else {
          setResponseData(JSON.parse(response.data.body));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (Object.keys(responseData).length === 0) {
    //Waiting for property data to be returned
    return <p>LOADING DATA...</p>;
  } else if (responseData.hasOwnProperty("error")) {
    return <p>Failed to Retrieve Data</p>;
  } else {
    return (
      <Styles>
        <CardDeck>
          {responseData.map((element, index) => (
            <Property
              item={element}
              key={`property-${index}`}
              state={props.state}
              setState={props.setState}
            ></Property>
          ))}
        </CardDeck>
      </Styles>
    );
  }
};
