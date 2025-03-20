import { useEffect, useRef, useState } from "react";

export const useGoogleMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    const googleMap = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      center: { lat: 37.7749, lng: -122.4194 },
      zoom: 8,
    });

    setMap(googleMap);
  }, []);

  return map;
};
