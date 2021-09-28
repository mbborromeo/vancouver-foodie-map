// import { Icon } from '@iconify/react';
// import locationIcon from '@iconify/icons-mdi/map-marker';
import './map.css';

const LocationPin = ({ text }) => (
  <div className="pin">
    {/* <Icon icon={ locationIcon } className="pin-icon" /> */}
    <div style={{ width: '10px', height: '10px', border: '5px solid red', }}></div>
    <p className="pin-text">{ text }</p>
  </div>
);

export default LocationPin;
