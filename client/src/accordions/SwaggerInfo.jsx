import React from "react";
import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function SwaggerInfo() {
  return (
    <Accordion.Item eventKey="4">
      <Accordion.Header>API Information</Accordion.Header>
      <Accordion.Body>
        <Container>
          <Row>
            <h3>Swagger Documentation</h3>
          </Row>
          <Row>
            <a href="http://localhost:4000/api-docs" target="_blank" rel="noreferrer">Go to external page - API Documentation</a>
          </Row>
        </Container>
      </Accordion.Body>
    </Accordion.Item>
  );
}

export default SwaggerInfo;