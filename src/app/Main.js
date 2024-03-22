'use client'
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

// Dynamically import Leaflet components to ensure they are only loaded client-side
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), {
  ssr: false,
});
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), {
  ssr: false,
});
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), {
  ssr: false,
});
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), {
  ssr: false,
});

const Main = () => {
  // State for the custom marker icon
  const [customMarkerIcon, setCustomMarkerIcon] = useState(null);
  
  // Example store data
  const stores = [
    { name: 'Hardware & Co', address: 'VIA TAL DEI TALI 69, 00100 - ROME', distance: '3.5 KM' },
    { name: 'Store of hardware', address: 'VIA TAL DEI TALI 69, 00100 - ROME', distance: '3.5 KM' },
    { name: 'New store', address: 'VIA TAL DEI TALI 69, 00100 - ROME', distance: '3.5 KM' },
    { name: 'Mega hardware store', address: 'VIA TAL DEI TALI 69, 00100 - ROME', distance: '3.5 KM' },
    { name: 'Ferramenta Store', address: 'VIA TAL DEI TALI 69, 00100 - ROME', distance: '3.5 KM' },
    { name: 'Roman Hardware', address: 'VIA TAL DEI TALI 69, 00100 - ROME', distance: '3.5 KM' },
    { name: 'Roman Hardware', address: 'VIA TAL DEI TALI 69, 00100 - ROME', distance: '3.5 KM' },
    { name: 'Roman Hardware', address: 'VIA TAL DEI TALI 69, 00100 - ROME', distance: '3.5 KM' },
    // Add more stores as needed
  ];

  // Default map position (latitude, longitude)
  const position = [41.9028, 12.4964]; // Rome, Italy

  useEffect(() => {
    // This check ensures that Leaflet is only initialized on the client side
    if (typeof window !== 'undefined') {
      const L = require('leaflet');
      const icon = L.icon({
        iconUrl: '/red.png', // Path to your marker icon
        iconSize: [40, 41], // Size of the icon
        iconAnchor: [20, 41], // Point of the icon which will correspond to marker's location
        popupAnchor: [0, -41], // Point from which the popup should open relative to the iconAnchor
      });
      setCustomMarkerIcon(icon);
    }
  }, []);

  // Before the custom marker icon is loaded, display a loading message
  if (!customMarkerIcon) {
    return <div>Loading map...</div>;
  }

  return (
   
   


 <div className="min-h-[100vh] sm:w-[90%] md:w-[90%] lg:w-[80%] p-4 md:p-8">
     <div className="bg-white rounded-lg shadow-lg p-6">
         <div className="flex flex-col md:flex-row justify-between items-center mb-6">
             <h1 className="text-xl md:text-2xl font-semibold mb-4 md:mb-0">Store Locator</h1>
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
                 <input className="border p-2 rounded w-full md:flex-1" placeholder="Rome, RM, Italy" />
                <button className="border p-2 rounded bg-blue-500 text-white w-full md:flex-1">SEARCH</button>
            </div>
        </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> 
        
             <div className="order-2 md:order-1">
             <MapContainer center={position} zoom={13} className="h-[50vh] md:h-[70vh] w-full rounded-lg">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {stores.map((store, index) => (
        <Marker key={index} position={position} icon={customMarkerIcon}>
          <Popup>
            {store.name}<br />{store.address}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
     </div>
             <div className="order-1 md:order-2">
                 <div className="h-[40vh] lg:h-[70vh] space-y-4 overflow-y-auto">
                     {stores.map((store, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
                             <div>
                                 <h3 className="font-semibold">{store.name}</h3>
                                 <p className="text-sm">{store.address}</p>
                             </div>
                             <div className="flex items-center">
                                <i className="fas fa-map-marker-alt text-gray-500"></i>
                                <span className="ml-2 text-sm">{store.distance}</span>
                                 <button className="ml-4 bg-gray-200 text-sm px-4 py-2 rounded">INDICATIONS</button>
                             </div>
                         </div>
                     ))}
                 </div>
            </div>
         </div>
     </div>
 </div> 


  );
}

export default Main;
