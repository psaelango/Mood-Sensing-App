import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Accordion from 'react-bootstrap/Accordion';
import AppInfo from "../accordions/AppInfo";
import UploadMoodInfo from "../accordions/UploadMoodInfo";
import MoodDistributionInfo from "../accordions/MoodDistributionInfo";
import NearByHappyMoodInfo from "../accordions/NearByHappyMoodInfo";

function Home() {
  return (
    <Container>
        <Row>
          <Accordion defaultActiveKey="0" style={{marginTop: '50px'}}>
            <AppInfo />
            <UploadMoodInfo />
            <MoodDistributionInfo />
            <NearByHappyMoodInfo />
          </Accordion>
        </Row>
    </Container>
  );
}

export default Home;
