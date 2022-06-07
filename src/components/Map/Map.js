import React from 'react'
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import floor from "../../vendor/floor.json";
import './Map.css';

export default function Map() {

  const latitude = 53.91687819154794;
  const longitude = 27.63435423374176;

  return (
    <MapContainer center={[latitude, longitude]} zoom={18} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeoJSON key={'map'} data={floor.features} />
    </MapContainer>
  )
}

