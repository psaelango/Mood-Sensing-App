import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types'; 
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import { toast } from 'react-toastify';

function MoodUploadForm({lat = '', lng = '', locationName = ''}) {
  const [isUploading, setIsUploading] = useState(false);
  const { user } = useSelector((state) => state.auth)
  console.log('user = ', user);
  const usernameInput = useRef(null);
  const moodInput = useRef(null);
  const latInput = useRef(null);
  const lngInput = useRef(null);
  const formRef = useRef(null);

  const onFormSubmit = (e) => {
    e.preventDefault();
    const userName = usernameInput?.current?.value;
    const mood = moodInput?.current?.value;
    if (!userName || !mood || !lat || !lng) {
      toast.error('Need all values to continue');
    } else {
      setIsUploading(true);
      const data = {userName, mood, lat, lng, locationName};
      fetch('http://localhost:4000/api/upload-mood', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
          toast.success(`${mood} mood at ${locationName} is added to your list`);
          setIsUploading(false);
          // formRef.current.reset();
          // latInput.value('');
          // lngInput.value('');
        })
        .catch((error) => {
          console.error('Error:', error);
          toast.error('Something Went Wrong!!! Check Console...')
          setIsUploading(false);
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

      <Button variant="primary" type="submit" disabled={isUploading ? true : false}> 
        {isUploading ? <Spinner animation="border" role="status" /> : 'Submit'}
      </Button>
    </Form>
  );
}

MoodUploadForm.propTypes = {  
  lat: PropTypes.number,  
  lng: PropTypes.number,
  locationName: PropTypes.string,
}

MoodUploadForm.defaultProps = {
  lat: '',
  lng: '',
  locationName: ''
}

export default MoodUploadForm;