'use client'
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import { useMap } from 'react-leaflet';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
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
  const position = [41.9028, 12.4964]; // Rome, Italy
  const [mapCenter, setMapCenter] = useState(position);
  const [selectedStoreId, setSelectedStoreId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  console.log(selectedStoreId)
  // Example store data
  const stores = [
    { id: 1, name: 'Hardware & Co', address: 'VIA TAL DEI TALI 69, 00100 - ROME', distance: '3.5 KM', position: [41.9028, 12.4964] },
    { id: 2, name: 'New store', address: 'VIA TAL DEI TALI 69, 00100 - ROME', distance: '3.5 KM', position: [47.9048, 12.4966] },
    
    // Add more stores as needed
  ];

  // Default map position (latitude, longitude)
 

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

  const handleStoreClick = (storePosition,storeId) => {
    setMapCenter(storePosition);
    setSelectedStoreId(storeId);
    
  }

  const MapUpdater = ({ center }) => {
    const map = useMap();
    map.flyTo(center);
    return null;
  };

  const filteredStores = searchTerm.trim()
  ? stores.filter(store =>
      store.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
    )
  : stores;
  return (
 
 <div className="min-h-[100vh] sm:w-[90%] md:w-[90%] lg:w-[80%] p-4 md:p-8">
     <div className="bg-white rounded-lg shadow-lg p-6">
         <div className="flex flex-col md:flex-row justify-between items-center mb-6">
             <h1 className="text-xl md:text-2xl font-semibold mb-4 md:mb-0">Store Locator</h1>
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
                 {/* <input className="border p-2 rounded w-full md:flex-1" placeholder="Search by store name" onChange={(e) => setSearchTerm(e.target.value)}/> */}
                 <TextField
  className="w-full md:flex-1"
  variant="outlined"
  placeholder="Search by store name"
  onChange={(e) => setSearchTerm(e.target.value)}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <SearchIcon />
      </InputAdornment>
    ),
  }}
/>               
               
            </div>
        </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> 
        
             <div className="order-2 md:order-1">
             <MapContainer center={mapCenter} zoom={13} className="h-[50vh] md:h-[70vh] w-full rounded-lg">
             <MapUpdater center={mapCenter} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
      {stores.map((store, index) => (
  <Marker key={index} position={store.position} icon={customMarkerIcon}>
    <Popup>
      {store.name}<br />{store.address}
    </Popup>
  </Marker>
))}
    </MapContainer>
     </div>
             <div className="order-1 md:order-2">
                 <div className="h-[40vh] lg:h-[70vh] space-y-4 overflow-y-auto">
                     {filteredStores.map((store) => (
                        <div  key={store.id} className={`bg-white p-4 rounded-lg shadow flex items-center justify-between cursor-pointer hover:bg-blue-100 ${selectedStoreId=== store.id ? 'bg-blue-100' : 'hover:bg-blue-100'}`}  
                        onClick={() => handleStoreClick(store.position,store.id)}>
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



