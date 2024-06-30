import { Stack } from "@mui/system";
import { GoogleMap, DirectionsService, DirectionsRenderer, LoadScript } from '@react-google-maps/api';
import { useCallback, useEffect, useMemo, useState } from "react";

interface MapProps {
  row: {
    starting_point: string,
    destination_point: string
  }
}

const LIBRARIES = import.meta.env.VITE_APP_GOOGLE_MAPS_LIBRARIES.split(',');
const API_KEY = import.meta.env.VITE_APP_GOOGLE_API_KEY

export function Map({ row }: MapProps) {

  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [calculateRoute, setCalculateRoute] = useState(false)
  const origin = row.starting_point
  const destination = row.destination_point

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const directionsCallback = useCallback((response: any) => {
    if (response !== null) {
      if (response.status === 'OK') {
        setDirectionsResponse(response);
      } else {
        console.log('response: ', response);
      }
    }
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const directionsServiceOptions = useMemo<any>(() => {
    return {
      origin,
      destination,
      travelMode: 'DRIVING',
    };
  }, [origin, destination]);

  const position = {
    lat: -23.6824124,
    lng: -46.5952992
  }

  useEffect(() => {
    if (origin && destination) {
      setCalculateRoute(true);
    }
  }, [origin, destination]);

  return (
    <Stack sx={{  width: '1125px', height: '500px'  }} alignContent={'center'}>
      <LoadScript
        googleMapsApiKey={API_KEY}
        libraries={LIBRARIES}
      >
        <GoogleMap
          zoom={10}
          center={position}
          mapContainerStyle={{ width: '100%', height: '100%' }}
        >
          {directionsResponse && (
            <DirectionsRenderer
              directions={directionsResponse}
            />
          )}
          {calculateRoute && (
            <DirectionsService
              options={directionsServiceOptions}
              callback={directionsCallback}
              onLoad={() => setCalculateRoute(false)}
            />
          )}
        </GoogleMap>
      </LoadScript>
    </Stack>
  )
}
