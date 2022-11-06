import React from "react";
import Accordion from 'react-bootstrap/Accordion';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function NearByHappyMoodInfo() {
  return (
  <Accordion.Item eventKey="3">
        <Accordion.Header>Near By Happy Mood</Accordion.Header>
        <Accordion.Body>
          <Container>
            <Row>
              <h3>Given the users current location, return the closest location where the user has been happy.</h3>
            </Row>
            <Row>
              <Link to="/nearby-happy-mood">Go to page - Nearest Happy Location</Link>
            </Row>
          </Container>
        </Accordion.Body>
      </Accordion.Item>
  );
}

export default NearByHappyMoodInfo;