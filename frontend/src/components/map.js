import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import axios from 'axios';
import 'maplibre-gl/dist/maplibre-gl.css';
import './map.css';

export default function Map(){
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng] = useState(139.753);
  const [lat] = useState(35.6844);
  const [zoom] = useState(14);
  const [API_KEY] = useState('7cIMefYtUxyFov4MBDhw');

  const [pins, setpins] = useState([])
  useEffect(() => {
    if (map.current) return;
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${'7cIMefYtUxyFov4MBDhw'}`,
      center: [lng, lat],
      zoom: zoom
    });

    // create the popup
    var title = "vacation";
    var name = "omaditya";
    var popup = new maplibregl.Popup({ offset: 25 }).setHTML(
        "<h1>Name : </h1><p>"+name+"</p><br><h1>Title : </h1><p>"+title+"</p>"
    );

    
    new maplibregl.Marker({color: '#FF0000'})
        .setLngLat([139.7525,35.6846])
        .setPopup(popup) 
        .addTo(map.current);


    const getPins = async ()=>{
      try {
        const res = await axios.get("/pins");
        setpins(res.data);
      } catch (error) {
        console.log(error)
      }
    }

    getPins()
  });

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}