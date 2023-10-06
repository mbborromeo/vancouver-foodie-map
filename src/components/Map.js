import { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import styled from "styled-components";
import LocationPin from "./elements/LocationPin";
import NearbyAttractions from "./sections/NearbyAttractions";
import Point from "./elements/Point";
import mapPoints from "../data/mapPoints";

const myAPIKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const Map = ({ center, zoom }) => {
  const [activeCategory, setActiveCategory] = useState("CafesAndBakeries");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePoint, setActivePoint] = useState(null);
  const [googleMapsObj, setGoogleMapsObj] = useState(null);
  const [map, setMap] = useState(null);

  const [mapCenter, setMapCenter] = useState({
    lat: center.lat,
    lng: center.lng,
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
      lat: center.lat,
      lng: center.lng,
    });
  };

  /*
  const handleCategorySelection = (category) => {
    setActiveCategory( category );
    setMapCenter({ 
      lat: center.lat, 
      lng: center.lng,
    });
    setActivePoint(null);
    setMenuOpen(false);

    const bounds = new googleMapsObj.LatLngBounds();
    mapPoints[ category ].forEach( (place) => {
      bounds.extend( new googleMapsObj.LatLng(place.lat, place.lng) );
    });

    bounds.extend( new googleMapsObj.LatLng( center.lat, center.lng) );
    map.fitBounds( bounds );
  };
  */

  const handlePointSelect = (point) => {
    setActivePoint(point);

    let bounds = new googleMapsObj.LatLngBounds();

    mapPoints[activeCategory].forEach((place) => {
      bounds.extend(new googleMapsObj.LatLng(place.lat, place.lng));
    });

    const pointLatLng = new googleMapsObj.LatLng(point.lat, point.lng);
    bounds.extend(pointLatLng);

    let currentMapCoords = map.getBounds();

    if (currentMapCoords.contains(pointLatLng)) {
      return;
    } else {
      currentMapCoords.extend(pointLatLng);
      map.fitBounds(bounds);
      if (activeCategory === "Parks") {
        map.setZoom(map.getZoom() - 0.5);
      }
    }
  };

  // Return map bounds based on list of places
  const getMapBounds = (map, gmapsObj, places) => {
    setMap(map);
    setGoogleMapsObj(gmapsObj);

    const bounds = new gmapsObj.LatLngBounds();

    places.forEach((place) => {
      bounds.extend(new gmapsObj.LatLng(place.lat, place.lng));
    });

    bounds.extend(new gmapsObj.LatLng(mapCenter.lat, mapCenter.lng));

    return bounds;
  };

  // Re-center map when resizing the window
  const bindResizeListener = (map, gmapsObj, bounds) => {
    gmapsObj.event.addDomListenerOnce(map, "idle", () => {
      gmapsObj.event.addDomListener(window, "resize", () => {
        map.fitBounds(bounds);
      });
    });
  };

  // Fit map to its bounds after the api is loaded
  const apiIsLoaded = (map, gmapsObj, arrayOfPlaces) => {
    // Get bounds by our places
    const bounds = getMapBounds(map, gmapsObj, arrayOfPlaces);

    // Fit map to bounds
    map.fitBounds(bounds);
    // Bind the resize listener
    bindResizeListener(map, gmapsObj, bounds);
  };

  useEffect(() => {
    //   if (props.browser.is.tablet) {
    //     setZoom(13.5);
    //   }
    resetMap();
  }, []);

  return (
    <Root>
      <NearbyAttractions
        activeCategory={activeCategory}
        activePoint={activePoint}
        menuOpen={menuOpen}
        handleMenu={setMenuOpen}
        // handleCategorySelection={handleCategorySelection}
        mapPoints={mapPoints}
        handlePointSelect={handlePointSelect}
      />

      <MapWrapper>
        <GoogleMapReact
          bootstrapURLKeys={{ key: myAPIKey }}
          defaultCenter={{ lat: mapCenter.lat, lng: mapCenter.lng }}
          center={{ lat: mapCenter.lat, lng: mapCenter.lng }}
          defaultZoom={zoom}
          zoom={zoom}
          // options={{
          //   styles: mapStyles,
          //   disableDefaultUI: disableDefaultUI ? true : false,
          //   clickableIcons: false,
          // }}
          mapId="c5ace3bb1e7e9bb6" // style not working
          yesIWantToUseGoogleMapApiInternals={true}
          onGoogleApiLoaded={({ map, maps }) =>
            apiIsLoaded(map, maps, mapPoints[activeCategory])
          }
        >
          <LocationPin
            lat={center.lat}
            lng={center.lng}
            text={center.address}
          />

          {mapPoints[activeCategory] &&
            mapPoints[activeCategory].length > 0 &&
            mapPoints[activeCategory].map((point, index) => (
              <Point
                point={point}
                lat={point.lat}
                lng={point.lng}
                key={index}
                index={index}
                handleClick={handlePointSelect}
                isActive={activePoint === point}
              />
            ))}
        </GoogleMapReact>
      </MapWrapper>
    </Root>
  );
};

export default Map;

const Root = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  padding: unset;
`;

const MapWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 80%;
  height: 100%;

  @media (max-width: 767px) {
    width: 100%;
  }
`;
