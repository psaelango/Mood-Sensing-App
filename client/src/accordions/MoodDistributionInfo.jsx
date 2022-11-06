import React from "react";
import Accordion from 'react-bootstrap/Accordion';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function MoodDistributionInfo() {
  return (
  <Accordion.Item eventKey="2">
        <Accordion.Header>Mood Distribution</Accordion.Header>
        <Accordion.Body>
          <Container>
            <Row>
              <h3>Return the mood frequency distribution for a given user</h3>
            </Row>
            <Row>
              <Link to="/mood-distribution">Go to page - User Moods</Link>
            </Row>
          </Container>
        </Accordion.Body>
      </Accordion.Item>
  );
}

export default MoodDistributionInfo;