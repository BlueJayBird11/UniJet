import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { OnGoingTrip } from '@/shared/types';

interface Props {
    onGoingTrip: OnGoingTrip;
    setOnGoingTrip: (value: OnGoingTrip) => void;
    L: any;
}

const RouteToUser: React.FC<Props> = ({onGoingTrip, setOnGoingTrip, L}) => {
  const map = useMap();

  useEffect(() => {
    if (map) {
      const routingControl = L.Routing.control({
        waypoints: [
          L.latLng(onGoingTrip.driverLocation[0], onGoingTrip.driverLocation[1]), // Starting point coordinates
          L.latLng(onGoingTrip.passengerLocation[0], onGoingTrip.passengerLocation[1]),     // Destination coordinates
        ],
        lineOptions: {
          styles: [{ color: '#007bff', opacity: 0.8, weight: 6 }],
        },
        router: new L.Routing.osrmv1({
          serviceUrl: 'https://router.project-osrm.org/route/v1',
        }),
      });

      routingControl.addTo(map);

      return () => {
        routingControl.removeFrom(map);
      };
    }
  }, [map]);

  return null;
};

export default RouteToUser;
