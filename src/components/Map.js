
import { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import styled from 'styled-components';
import LocationPin from './elements/LocationPin';
import NearbyAttractions from './sections/NearbyAttractions';
import Point from './elements/Point';
import mapPoints from '../data/mapPoints';

const myAPIKey = "AIzaSyCmgI79g2spF5dHDqd4_xJMAC_vOehnzWo";

const Map = ({center, zoom}) => {
  const [activeCategory, setActiveCategory] = useState('CafesAndBakeries');
  const [activePoint, setActivePoint] = useState(null);
  const [maps, setMaps] = useState(null);
  const [map, setMap] = useState(null);

  const [mapCenter, setMapCenter] = useState({
    lat: 49.26667042947885, 
    lng: -123.13828862493452,
  });

  Map.defaultProps = {
    center: {
      lat: 49.26667042947885, 
      lng: -123.13828862493452,
    },
    zoom: 12,
  };

  const resetMap = () => {
    setMapCenter({ 
      lat: 49.26667042947885, 
      lng: -123.13828862493452,
    });
  };

  /*
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
  */

  const handlePointSelect = (point) => {
    setActivePoint(point);

    let bounds = new maps.LatLngBounds();
    console.log('handlePointSelect bounds', bounds)

    mapPoints[activeCategory].forEach((place) => {
      bounds.extend(new maps.LatLng(place.lat, place.lng));
    });

    bounds.extend(new maps.LatLng(point.lat, point.lng));

    let currentMapCoords = map.getBounds();

    if (map.getBounds().contains(new maps.LatLng(point.lat, point.lng))) {
      return;
    } else {
      currentMapCoords.extend(new maps.LatLng(point.lat, point.lng));
      map.fitBounds(bounds);
      if (activeCategory === 'Parks') {
        map.setZoom(map.getZoom() - 0.5);
      }
    }
  };

  // Return map bounds based on list of places
  const getMapBounds = (map, maps, places) => {    
    setMap(map);
    setMaps(maps);

    const bounds = new maps.LatLngBounds();
    console.log('getMapBounds bounds', bounds)

    places.forEach((place) => {
      bounds.extend(new maps.LatLng(place.lat, place.lng));
    });

    bounds.extend(new maps.LatLng(mapCenter.lat, mapCenter.lng));

    return bounds;
  };

  // Re-center map when resizing the window
  const bindResizeListener = (map, maps, bounds) => {
    maps.event.addDomListenerOnce(map, 'idle', () => {
      maps.event.addDomListener(window, 'resize', () => {
        map.fitBounds(bounds);
      });
    });
  };

  // Fit map to its bounds after the api is loaded
  const apiIsLoaded = (map, maps, places) => {
    // Get bounds by our places
    const bounds = getMapBounds(map, maps, places);
    console.log('apiIsLoaded bounds', bounds)

    // Fit map to bounds
    map.fitBounds(bounds);
    // Bind the resize listener
    bindResizeListener(map, maps, bounds);
  };

  useEffect(() => {
    //   if (props.browser.is.tablet) {
    //     setZoom(13.5);
    //   }
    resetMap();
  }, []);

  return (
    <Container>
      <NearbyAttractions
        activeCategory={activeCategory}
        activePoint={activePoint}
        // menuOpen={menuOpen}
        // handleCategorySelection={handleCategorySelection}
        // handleMenu={setMenuOpen}
        mapPoints={mapPoints}
        handlePointSelect={handlePointSelect}
      />

      <MapWrapper>
        <GoogleMapReact
          bootstrapURLKeys={ { key: myAPIKey } }
          defaultCenter={{ lat: mapCenter.lat, lng: mapCenter.lng }}
          defaultZoom={zoom}        
          center={{ lat: mapCenter.lat, lng: mapCenter.lng }}
          zoom={zoom}
          // options={{
          //   styles: mapStyles,
          //   disableDefaultUI: disableDefaultUI ? true : false,
          //   clickableIcons: false,
          // }}
          mapId='c5ace3bb1e7e9bb6' // style not working        
          yesIWantToUseGoogleMapApiInternals={ true }
          onGoogleApiLoaded={ ({ map, maps }) => apiIsLoaded(map, maps, mapPoints[activeCategory]) }
        >
          <LocationPin
            lat={ center.lat }
            lng={ center.lng }
            text={ center.address }
          />

          {
            mapPoints[activeCategory] && mapPoints[activeCategory].length > 0 &&
            mapPoints[activeCategory].map( (point, index) => (
              <Point
                point={point}
                lat={point.lat}
                lng={point.lng}
                key={index}
                index={index}
                handleClick={handlePointSelect}
                isActive={activePoint === point}                
              />
            ))
          }
        </GoogleMapReact>
      </MapWrapper>
    </Container>
  );
}

export default Map;

const Container = styled.div`
  width: 100%;
  height: 100vh; /* 680px */
  border: 1px solid orange;
  position: relative;
  // overflow: hidden;
  padding: unset;
`;

const MapWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 80%;
  height: 100vh;
  border: 1px solid blue;
`;
