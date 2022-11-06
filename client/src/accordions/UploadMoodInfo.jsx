import React from "react";
import Accordion from 'react-bootstrap/Accordion';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function UploadMoodInfo() {
  return (
  <Accordion.Item eventKey="1">
        <Accordion.Header>Upload Mood</Accordion.Header>
        <Accordion.Body>
          <Container>
            <Row>
              <h3>Upload a mood capture for a given user and location</h3>
            </Row>
            <Row>
              <Link to="/upload-mood">Go to page - Upload Mood</Link>
            </Row>
          </Container>
        </Accordion.Body>
      </Accordion.Item>
  );
}

export default UploadMoodInfo;