
import { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import './map.css';
import LocationPin from './LocationPin';
import NearbyAttractions from './elements/NearbyAttractions';
import mapPoints from '../data/mapPoints';

const myAPIKey = "AIzaSyCmgI79g2spF5dHDqd4_xJMAC_vOehnzWo";

const Map = ({ location, zoomLevel }) => {
  const [activeCategory, setActiveCategory] = useState('CafesAndBakeries');

  const handleCategorySelection = (category) => {
    setActiveCategory(category);
    // setMapCenter({ lat: 47.7210293, lng: -122.2045769 });
    // setActivePoint(null);
    // setMenuOpen(false);

    // const bounds = new maps.LatLngBounds();
    // mapPoints[category].forEach((place) => {
    //   bounds.extend(new maps.LatLng(place.lat, place.lng));
    // });

    // bounds.extend(new maps.LatLng(47.7210293, -122.2045769));
    // map.fitBounds(bounds);
  };

  return (
    <div className="map">
      <h2 className="map-h2">Foodie Tour: South Granville &amp; surrounds</h2>

      <div className="google-map">
        <NearbyAttractions
          activeCategory={activeCategory}
          // activePoint={activePoint}
          // menuOpen={menuOpen}
          handleCategorySelection={handleCategorySelection}
          // handleMenu={setMenuOpen}
          mapPoints={mapPoints}
          // handlePointSelect={handlePointSelect}
        />

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
