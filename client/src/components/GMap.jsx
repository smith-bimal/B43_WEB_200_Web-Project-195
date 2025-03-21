import React, { useEffect, useRef, useState, useCallback } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const defaultCenter = {
  lat: 27.7172,
  lng: 85.3240
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

const GMap = ({ destinations = [] }) => {
  const [center, setCenter] = useState(defaultCenter);
  const [directions, setDirections] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const directionsServiceRef = useRef(null);
  const directionsRendererRef = useRef(null);

  const handleApiLoaded = useCallback(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (destinations.length > 0) {
      // Set center to first destination
      setCenter({
        lat: destinations[0].latitude,
        lng: destinations[0].longitude
      });

      // If there are multiple destinations, calculate route
      if (destinations.length > 1) {
        const waypoints = destinations.slice(1, -1).map(location => ({
          location: { lat: location.latitude, lng: location.longitude },
          stopover: true
        }));

        const request = {
          origin: { lat: destinations[0].latitude, lng: destinations[0].longitude },
          destination: {
            lat: destinations[destinations.length - 1].latitude,
            lng: destinations[destinations.length - 1].longitude
          },
          waypoints,
          travelMode: 'DRIVING'
        };

        if (directionsServiceRef.current) {
          directionsServiceRef.current.route(request, (result, status) => {
            if (status === 'OK') {
              setDirections(result);
            } else {
              console.error('Directions request failed:', status);
            }
          });
        }
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
          zoom={destinations.length === 1 ? 12 : 6}
          options={{
            mapTypeControl: false,
            streetViewControl: false,
            styles: mapStyles
          }}
        >
          {destinations.map((destination, index) => (
            <Marker
              key={destination._id || index}
              position={{
                lat: destination.latitude,
                lng: destination.longitude
              }}
              title={destination.name}
            />
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
      )}
    </LoadScript>
  );
};

export default GMap;
