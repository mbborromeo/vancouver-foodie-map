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
    <div>
      <Header>Cafe Crawl: South Granville &amp; surrounds</Header>

      <div style={{ height: '90vh', width: '100%' }}>
        <Map 
          center={{ lat: location.lat, lng: location.lng }}
          zoom={ zoomLevel }        
          mapId='c5ace3bb1e7e9bb6' // style not working
        />
      </div>
    </div>
  );
}

export default App;

const Header = styled.h2`
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: darkred;
  color: lightgoldenrodyellow;
  margin: 0;
  /* padding: 20px 15px; */
  height: 10vh;
  font-family: 'Brush Script MT', 'Brush Script Std', cursive;
  font-size: 35px;
  line-height: 70px;
  font-weight: normal;

  @media (max-width: 767px) {
    font-size: 27px;
    line-height: 25px;
  }
`;