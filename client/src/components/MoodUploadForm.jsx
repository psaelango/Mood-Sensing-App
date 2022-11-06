import React, { useRef } from 'react';
import PropTypes from 'prop-types'; 
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function MoodUploadForm({lat = '', lng = ''}) {
  const usernameInput = useRef(null);
  const moodInput = useRef(null);
  const latInput = useRef(null);
  const lngInput = useRef(null);
  const formRef = useRef(null);

  const onFormSubmit = (e) => {
    e.preventDefault();
    const username = usernameInput?.current?.value;
    const mood = moodInput?.current?.value;
    const lat = latInput?.current?.value;
    const lng = lngInput?.current?.value;
    if (!username || !mood || !lat || !lng) {
      alert('Need all values to continue');
    } else {
      const data = {username, mood, lat, lng};
      fetch('http://localhost:4000/upload-mood', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
          // formRef.current.reset();
          // latInput.value('');
          // lngInput.value('');
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('Something Went Wrong!!! Check Console...')
        });
    }
    e.stopPropagation();
  }

  return (
    <Form onSubmit={onFormSubmit} ref={formRef}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>User Name</Form.Label>
        <Form.Control type="text" ref={usernameInput} defaultValue='' placeholder="No special characters" required/>
        <Form.Text className="text-muted">
          Usernames are case sensitive. Enter correctly to update records properly
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Mood</Form.Label>
        <Form.Select ref={moodInput}>
          <option>Happy</option>
          <option>Sad</option>
          <option>Neutral</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Latitude</Form.Label>
        <Form.Control ref={latInput} value={lat} required disabled />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Longitude</Form.Label>
        <Form.Control ref={lngInput} value={lng} required disabled />
      </Form.Group>

      <Button variant="primary" type="submit" > 
        Submit
      </Button>
    </Form>
  );
}

MoodUploadForm.propTypes = {  
  lat: PropTypes.string,  
  lng: PropTypes.string
}

MoodUploadForm.defaultProps = {
  lat: '',
  lng: ''
}

export default MoodUploadForm;