import React from "react";
import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function AppInfo() {
  return (
  <Accordion.Item eventKey="0">
        <Accordion.Header>Application Information</Accordion.Header>
        <Accordion.Body>
          <Container>
            <Row>
              <h3>Mood Sensing App</h3>
            </Row>
            <Row>
              <p>
                The camera on your phone can sense a users mood based on their facial features, where mood can be characterized as either happy, sad, or neutral. 
                This is full stack showcase that leverages the phones mood-sensing capability to collect mood data and provide insights:</p>
            </Row>
          </Container>
        </Accordion.Body>
      </Accordion.Item>
  );
}

export default AppInfo;