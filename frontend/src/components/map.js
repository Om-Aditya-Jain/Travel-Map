import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './map.css';

export default function Map(){
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng] = useState(139.753);
  const [lat] = useState(35.6844);
  const [zoom] = useState(14);
  const [API_KEY] = useState('7cIMefYtUxyFov4MBDhw');

  useEffect(() => {
    if (map.current) return;
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${'7cIMefYtUxyFov4MBDhw'}`,
      center: [lng, lat],
      zoom: zoom
    });

    // create the popup
    var title = "omaditya";
    var popup = new maplibregl.Popup({ offset: 25 }).setText(
        'title = '+title
    );

    new maplibregl.Marker({color: '#FF0000'})
        .setLngLat([139.7525,35.6846])
        .setPopup(popup) 
        .addTo(map.current);
  });

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}