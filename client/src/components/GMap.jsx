import React, { useEffect, useRef, useState } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 27.7172,
  lng: 85.3240
};

const destinations = [
  { lat: 27.7172, lng: 85.3240 },
  { lat: 28.2096, lng: 83.9856 },
  { lat: 27.5291, lng: 84.3542 },
  { lat: 27.9881, lng: 86.9250 }
];

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

const GMap = () => {
  const directionsServiceRef = useRef(null);
  const directionsRendererRef = useRef(null);
  const [directions, setDirections] = useState(null);

  useEffect(() => {
    if (directionsServiceRef.current && directionsRendererRef.current) {
      const waypoints = destinations.slice(1, -1).map(location => ({ location, stopover: true }));
      directionsServiceRef.current.route(
        {
          origin: destinations[0],
          destination: destinations[destinations.length - 1],
          waypoints,
          travelMode: 'DRIVING'
        },
        (result, status) => {
          if (status === 'OK') {
            setDirections(result);
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    }
  }, []);

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}>
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
        {destinations.map((destination, index) => (
          <Marker key={index} position={destination} />
        ))}
        {directions && (
          <DirectionsRenderer
            directions={directions}
            options={{
              polylineOptions: {
                strokeColor: '#000000',
                strokeOpacity: 0.8,
                strokeWeight: 6
              }
            }}
            onLoad={directionsRenderer => {
              directionsRendererRef.current = directionsRenderer;
            }}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default GMap;
