import React from 'react';
import Map from './components/Map';

function App() {
  const location = {
    address: 'South Granville',
    lat: 49.26667042947885, 
    lng: -123.13828862493452,
  }
  const zoomLevel = 12;

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <h2 className="map-h2">Foodie Tour: South Granville &amp; surrounds</h2>

      <Map 
        center={{ lat: location.lat, lng: location.lng }}
        zoom={ zoomLevel }        
        mapId='c5ace3bb1e7e9bb6' // style not working
      />
    </div>
  );
}

export default App;
