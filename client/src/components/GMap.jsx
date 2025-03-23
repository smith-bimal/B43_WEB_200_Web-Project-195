import React, { useEffect, useState, useCallback } from 'react';
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
  const [center, setCenter] = useState({ lat: 20.5937, lng: 78.9629 }); // Default to India's center
  const [isLoaded, setIsLoaded] = useState(false);

  const handleApiLoaded = useCallback(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (destinations && destinations.latitude && destinations.longitude) {
      const lat = Number(destinations.latitude);
      const lng = Number(destinations.longitude);
      if (!isNaN(lat) && !isNaN(lng)) {
        setCenter({ lat, lng });
      }
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
          zoom={10}
          options={{
            mapTypeControl: false,
            streetViewControl: false,
            styles: mapStyles
          }}
        >
          {destinations && destinations.latitude && destinations.longitude && (
            <Marker
              position={{
                lat: Number(destinations.latitude),
                lng: Number(destinations.longitude)
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
