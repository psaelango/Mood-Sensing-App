
import React, { useRef, useEffect } from "react";
import { useSelector } from 'react-redux';
import MapboxGl from 'mapbox-gl';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { toast } from 'react-toastify';
import Alert from 'react-bootstrap/Alert';

export default function MoodDistribution() {
  const { user } = useSelector((state) => state.auth)
  console.log('user = ', user);
  const usernameInput = useRef(null);
  const formRef = useRef(null);
  const Mapcontainer = useRef(null);
  let map;

  const onFormSubmit = (e) => {
    e.preventDefault();
    const userName = usernameInput?.current?.value;
    const mapMarkers = document.getElementsByClassName('mapboxgl-marker');
    while(mapMarkers.length > 0){
      mapMarkers[0].parentNode.removeChild(mapMarkers[0]);
    }
    fetch(`http://localhost:4000/api/mood-frequency/${userName}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        formRef.current.reset();

        // add markers to map
        let bounds = new MapboxGl.LngLatBounds();
        for (let i = 0; i < data.length; i++) {
          const elem = data[i];
          const marker = document.createElement('div');
          marker.className = 'map-marker';
          switch (elem.mood) {
            case 'Happy':
              marker.className = 'happy-marker';
              break;
            case 'Sad':
              marker.className = 'sad-marker';
              break;
            case 'Neutral':
              marker.className = 'neutral-marker';
              break;
            default:
              break;
          }
          new MapboxGl.Marker(marker)
            .setLngLat(elem.location.coordinates)
            .setPopup(
              new MapboxGl.Popup({ offset: 25 })
              .setHTML(
                `<pre>${elem.locationName}</pre>`
              )
            )
            .addTo(map);
          bounds.extend(elem.location.coordinates);
        }
        console.log('map = ', map);
        if (data.length > 0) {
          map.fitBounds(bounds, {padding: 100});
        } else {
          toast.info('No Records found for the user');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        toast.error('Something Went Wrong!!! Check Console...')
      });
    e.stopPropagation();
  }

  const initMap = () => {
    MapboxGl.accessToken = 'pk.eyJ1IjoicHNhZWxhbmdvIiwiYSI6ImNpejV6end5bzA2ZjEzM3A4NTE3NnM5YXMifQ.OH-2rxal0YdBVhJTAab4fg';
    map = new MapboxGl.Map({
      container: Mapcontainer.current,
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-79.4512, 43.6568],
      zoom: 8
    });
    map.on('load', function () {
      map.resize();
    });
  }

  useEffect(() => {
    initMap();
  });

  return (
    
    <div>
      <Alert key='primary' variant='primary'>
        Note: You can search distribution for any user if you know their user name
      </Alert>
      <div style={{display: 'flex'}}>
        <div style={{margin: '20px', flex: 1}}>
          <Form onSubmit={onFormSubmit} ref={formRef}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>User Name</Form.Label>
              <Form.Control type="text" ref={usernameInput} defaultValue='' placeholder="Note: Case Sensitive" required/>
              <Form.Text className="text-muted">
                Usernames are case sensitive. Enter correctly to get records properly
              </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit" > 
              Submit
            </Button>
          </Form>
          <Row style={{marginTop: '50px'}}>
            <Card style={{ width: '9rem' }}>
              <Card.Img variant="top" src="./Happy_Marker.png" />
              <Card.Body>
                <Card.Title>Happy</Card.Title>
                <Card.Text>
                  This emoji denotes Happy Mood
                </Card.Text>
              </Card.Body>
            </Card>
            <Card style={{ width: '9rem' }}>
              <Card.Img variant="top" src="./Sad_Marker.png" />
              <Card.Body>
                <Card.Title>Sad</Card.Title>
                <Card.Text>
                  This emoji denotes Sad Mood
                </Card.Text>
              </Card.Body>
            </Card>
            <Card style={{ width: '9rem' }}>
              <Card.Img variant="top" src="./Neutral_Marker.png" />
              <Card.Body>
                <Card.Title>Neutral</Card.Title>
                <Card.Text>
                  This emoji denotes Neutral Mood
                </Card.Text>
              </Card.Body>
            </Card>
          </Row>
        </div>
        <div style={{position: 'relative', width: '900px', height: '500px', margin: '20px', flex: 2}}>
          <div ref={Mapcontainer} id="map" style={{position: 'relative', width: 'inherit', height: 'inherit'}}/>
        </div>
      </div>
    </div>
  );
}