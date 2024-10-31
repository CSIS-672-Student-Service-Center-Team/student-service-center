import { useState, useCallback, useRef, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 32.7765,
  lng: -79.9311, // Coordinates for Charleston, SC
};

interface MapProps {
  selectedGarage: {
    name: string;
    location: {
      lat: number;
      lng: number;
    };
  } | null;
}

const Map: React.FC<MapProps> = ({ selectedGarage }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);

  const mapRef = useRef<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    mapRef.current = null;
    setMap(null);
  }, []);

  const fetchDirections = useCallback(
    (destination: google.maps.LatLngLiteral) => {
      if (!map) return;

      const directionsService = new google.maps.DirectionsService();
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const origin = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          directionsService.route(
            {
              origin: origin,
              destination: destination,
              travelMode: google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
              if (status === google.maps.DirectionsStatus.OK && result) {
                setDirections(result);
              }
            }
          );
        },
        () => {
          alert("Error: The Geolocation service failed.");
        }
      );
    },
    [map]
  );

  useEffect(() => {
    if (selectedGarage) {
      fetchDirections(selectedGarage.location);
    } else {
      setDirections(null);
    }
  }, [selectedGarage, fetchDirections]);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={13}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {selectedGarage && (
        <Marker
          position={selectedGarage.location}
          title={selectedGarage.name}
        />
      )}
      {directions && (
        <DirectionsRenderer
          directions={directions}
          options={{
            suppressMarkers: true,
          }}
        />
      )}
    </GoogleMap>
  );
};

export default Map;
