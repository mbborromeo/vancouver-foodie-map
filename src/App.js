import React from 'react';
import styled from 'styled-components';
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
      <Header>Foodie Tour: South Granville &amp; surrounds</Header>

      <Map 
        center={{ lat: location.lat, lng: location.lng }}
        zoom={ zoomLevel }        
        mapId='c5ace3bb1e7e9bb6' // style not working
      />
    </div>
  );
}

export default App;

const Header = styled.h2`
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: yellow;
  margin: 0;
  padding: 20px 15px;
`;