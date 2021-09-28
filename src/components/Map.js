
import GoogleMapReact from 'google-map-react';
import './map.css';
import LocationPin from './LocationPin';

const myAPIKey = "AIzaSyCmgI79g2spF5dHDqd4_xJMAC_vOehnzWo";

const Map = ({ location, zoomLevel }) => {
  return (
    <div className="map">
      <h2 className="map-h2">Come Visit Us At Our Campus</h2>

      <div className="google-map">
        <GoogleMapReact
          bootstrapURLKeys={ { key: myAPIKey } }
          defaultCenter={ location }
          defaultZoom={ zoomLevel }
        >
          <LocationPin
            lat={ location.lat }
            lng={ location.lng }
            text={ location.address }
          />
        </GoogleMapReact>
      </div>
    </div>
  );
}

export default Map;
