import React, { useEffect, useRef, useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const mapStyles = [
  {
    featureType: "all",
    elementType: "all",
    stylers: [{ saturation: -100 }]
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#e8e8e8" }]
  },
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [{ color: "#f5f5f5" }]
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#ffffff" }]
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [{ color: "#d6d6d6" }]
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#c4c4c4" }]
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ color: "#eeeeee" }]
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#e5e5e5" }]
  },
  {
    featureType: "all",
    elementType: "labels.text.fill",
    stylers: [{ color: "#404040" }]
  },
  {
    featureType: "all",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#ffffff" }]
  }
];

const GMap = ({ destinations }) => {
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  const handleApiLoaded = useCallback(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (destinations) {
      setCenter({
        lat: Number(destinations.latitude),
        lng: Number(destinations.longitude)
      });
    }
  }, [destinations]);

  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}
      onLoad={handleApiLoaded}
      loadingElement={<div>Loading...</div>}
    >
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12}
          options={{
            mapTypeControl: false,
            streetViewControl: false,
            styles: mapStyles
          }}
        >
          {destinations?.coordinates && (
            <Marker
              position={{
                lat: Number(destinations.coordinates.latitude),
                lng: Number(destinations.coordinates.longitude)
              }}
              title={destinations.name}
            />
          )}
        </GoogleMap>
      )}
    </LoadScript>
  );
};

export default GMap;
