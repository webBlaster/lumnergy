import React from "react";
import { Spinner, Container } from "react-bootstrap";
import "./loader.css";

const Loader = ({ loading }) => {
  return (
    <Container
      hidden={!loading ? true : false}
      className="dark-overlay text-center"
    >
      <Spinner animation="border" variant="light" className="request-spinner" />
      <p className="white-text">Please wait...</p>
    </Container>
  );
};

export default Loader;
