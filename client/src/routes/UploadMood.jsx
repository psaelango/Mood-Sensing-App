import React, { useState, useEffect, useRef } from "react";
import MapboxGl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import MoodUploadForm from "../components/MoodUploadForm";
import Alert from 'react-bootstrap/Alert';
import { coordinatesGeocoder } from '../utils/utils';

export default function UploadMood() {

  const [mapLat, setMapLat] = useState(null);
  const [mapLng, setMapLng] = useState(null);
  const [mapLocName, setMapLocName] = useState(null);

  const Mapcontainer = useRef(null);
  const initMap = () => {
    MapboxGl.accessToken = 'pk.eyJ1IjoicHNhZWxhbmdvIiwiYSI6ImNpejV6end5bzA2ZjEzM3A4NTE3NnM5YXMifQ.OH-2rxal0YdBVhJTAab4fg';
    const map = new MapboxGl.Map({
      container: Mapcontainer.current,
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-79.4512, 43.6568],
      zoom: 8
    });

    const geoCoder = new MapboxGeocoder({
      accessToken: MapboxGl.accessToken,
      localGeocoder: coordinatesGeocoder,
      zoom: 4,
      placeholder: 'Try: -40, 170',
      mapboxgl: MapboxGl,
      reverseGeocode: true
    });
  
    map.addControl(geoCoder);
    map.on('load', function () {
      map.resize();
    });

    geoCoder.on('result', function(e) {
      console.log(e.result.center)
      if (e.result.center && e.result.center.length === 2) {
        setMapLat(e.result.center[1]);
        setMapLng(e.result.center[0]);
        setMapLocName(e.result.place_name);
      }
    })
  }

  useEffect(() => {
    initMap();
  }, [])

  return (
    <div>
      <Alert key='primary' variant='primary'>
        Note: You can add mood to any user with the correct user name.
        Make sure to type a place in the box to load Latitude & Longitude.
      </Alert>
      <div style={{display: 'flex'}}>
        <div style={{margin: '20px', flex: 1}}>
          <MoodUploadForm lat={mapLat} lng={mapLng} locationName={mapLocName}/> 
        </div>
        <div style={{position: 'relative', width: '900px', height: '500px', margin: '20px', flex: 2}}>
          <div ref={Mapcontainer} id="map" style={{position: 'relative', width: 'inherit', height: 'inherit'}}/>
        </div>
      </div>
    </div>
  );
}