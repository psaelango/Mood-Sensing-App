import React, { useRef, useEffect } from "react";
import { useSelector } from 'react-redux';
import MapboxGl from 'mapbox-gl';
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { coordinatesGeocoder } from '../utils/utils';
import { toast } from 'react-toastify';
import Alert from 'react-bootstrap/Alert';

export default function NearByHappyMood() {
  const { user } = useSelector((state) => state.auth)
  console.log('user = ', user);

  const Mapcontainer = useRef(null);
  let map;

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
      console.log(e.result);
      const mapMarkers = document.getElementsByClassName('mapboxgl-marker');
      while(mapMarkers.length > 0){
        mapMarkers[0].parentNode.removeChild(mapMarkers[0]);
      }
      if (e.result.center && e.result.center.length === 2) {
        const lat = e.result.center[1];
        const lng = e.result.center[0];
        fetch(`http://localhost:4000/api/nearby-locations/happy?lat=${lat}&lng=${lng}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          }
        })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
  
          // add markers to map
          let bounds = new MapboxGl.LngLatBounds();
          for (let i = 0; i < data.length; i++) {
            const elem = data[i];
            const marker = document.createElement('div');
            marker.className = 'map-marker happy-marker';
            new MapboxGl.Marker(marker).setLngLat(elem.location.coordinates).addTo(map);
            bounds.extend(elem.location.coordinates);
          }
          console.log('map = ', map);
          if (data.length > 0) {
            map.fitBounds(bounds);
          } else {
            toast.info('No locations near where user mood is happy');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          toast.error('Something Went Wrong!!! Check Console...')
        });
      }
    })
  }

  useEffect(() => {
    initMap();
  });
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <Alert key='primary' variant='primary'>
        Note: Type a place in the box to see the happier locations near that place
      </Alert>
      <div style={{position: 'relative', width: '1390px', height: '500px', margin: '20px', flex: 2}}>
        <div ref={Mapcontainer} id="map" style={{position: 'relative', width: 'inherit', height: 'inherit'}}/>
      </div>
    </div>
  );
}