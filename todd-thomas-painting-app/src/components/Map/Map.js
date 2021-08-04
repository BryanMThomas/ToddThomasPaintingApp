import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import Layout from "../Layout/Layout";

//const AnyReactComponent = ({ text }) => <Badge bg="primary">Primary</Badge>;

class Map extends Component {
  static defaultProps = {
    center: {
      lat: 33.85,
      lng: -112.11,
    },
    zoom: 12.5,
  };

  render() {
    return (
      <Layout>
        <div>KEY: Red - Exterior Blue - Cabinets Yellow- Service</div>
        <div style={{ height: "80vh", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: process.env.REACT_APP_GOOGLE_API_KEY,
            }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          >
            <div
              style={{
                width: ".5em",
                height: ".5em",
                background: "red",
              }}
              lat={33.85846566117754}
              lng={-112.11640904208451}
            ></div>
          </GoogleMapReact>
        </div>
      </Layout>
    );
  }
}

export default Map;
