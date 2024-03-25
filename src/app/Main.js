'use client'
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import { useMap } from 'react-leaflet';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { collection, getDocs } from 'firebase/firestore'; // Import Firestore functions
import { db } from './Firebase'; // Make sure this path points to your Firebase config file
import PlaceIcon from '@mui/icons-material/Place';
import LaunchIcon from '@mui/icons-material/Launch';
import { Button } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';


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
  
  const [mapCenter, setMapCenter] = useState(undefined);
  const [selectedStoreId, setSelectedStoreId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  console.log(selectedStoreId)
  // Example store data
 
  const [stores, setStores] = useState([]);


  const [searchProvider, setSearchProvider] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') { // Making sure it's client-side
      import('leaflet-geosearch').then((GeoSearch) => {
        const provider = new GeoSearch.OpenStreetMapProvider();
        setSearchProvider(provider);
      }).catch(error => console.error('Failed to load leaflet-geosearch', error));
    }
  }, []);
  

  const handleSearch = async (event) => {
    const query = event.target.value;
    if (searchProvider && query) {
      try {
        const results = await searchProvider.search({ query });
        if (results && results.length > 0) {
          const { x, y } = results[0]; // x is longitude, y is latitude
          setMapCenter([y, x]);
        }
      } catch (error) {
        console.error('Error performing search:', error);
      }
    }
  };
  


  // Default map position (latitude, longitude)
  useEffect(() => {
    const fetchStores = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'stores'));
        const storeData = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }));
        setStores(storeData);
        if (storeData.length > 0) {
          // If stores are found, set the map center to the position of the first store
          setMapCenter(storeData[0].position);
          setSelectedStoreId(storeData[0].id); // Optionally select the first store
        }
      } catch (error) {
        console.error('Error fetching stores:', error);
      }
    };

    if (typeof window !== 'undefined') {
      fetchStores();
    }
  }, []);

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
     <div className="bg-white rounded-lg shadow-lg p-6 relative">
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
 
             <div className="order-2 md:order-1 relative">
             {mapCenter ? ( // Only render the MapContainer if mapCenter is defined
          <MapContainer center={mapCenter} zoom={13} className="h-[50vh] md:h-[65vh] w-full rounded-lg mt-10">
            <MapUpdater center={mapCenter} />
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {stores.map((store, index) => (
              <Marker key={index} position={store.position} icon={customMarkerIcon}>
                <Popup>
                  
                  <div
        dangerouslySetInnerHTML={{ __html: `
          <strong>${store.name}</strong><br />
          ${store.address}<br />
          ${store.phone ? `Phone: ${store.phone}<br /><br />` : ''}
          ${store.website ? 
            `<a href="${store.website}" target="_blank" rel="noopener noreferrer" style="background-color: black; color: white; padding: 5px 10px; cursor: pointer; border: none; border-radius: 5px; margin-top: 5px; text-decoration: none;">Visit Website</a>` : 
            ''
          }
        `}}
      />
                </Popup>
              </Marker>
            ))}
         
          </MapContainer>
          
        ) : (
          <div>Loading map...</div> // Display a loading message or loader while the data is being fetched
        )}
        <TextField
            className="absolute top-0 left-0 w-full z-10" // Absolute positioning on top of the map
            variant="outlined"
            placeholder="Search location"
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              position: 'absolute', // Position the search bar absolutely to overlay the map
              top: -30, // Distance from the top of the map container
              left: 0, // Align to the left of the map container
              right: 0, // Align to the right of the map container
              margin: 'auto', // Center the search bar horizontally
              width: '100%', // Width of the search bar; less than 100% for some padding
              zIndex: 1000, // Ensure the search bar is above the map
              
            }}
          />
        
     </div>
             <div className="order-1 md:order-2">
                 <div className="h-[40vh] lg:h-[70vh] space-y-4 overflow-y-auto">
       {filteredStores.map((store) => (
  <div key={store.id} className={`bg-white p-4 rounded-lg shadow flex flex-col justify-between cursor-pointer hover:bg-blue-100 ${selectedStoreId === store.id ? 'bg-blue-100' : ''}`} onClick={() => handleStoreClick(store.position,store.id)}>
    <div className="mb-2">
      <h3 className="text-xl font-semibold">{store.name}</h3>
      
      
    </div>
    <div className="flex justify-between items-center">
    <div className="flex flex-col items-start space-x-2">
  <div className="flex items-center space-x-2">
    <PlaceIcon  />
    <p className="text-sm text-gray-700">{store.address}</p>
  </div>
  
  {store.phone && ( // This line checks if the phone number exists before rendering
    <div className="flex items-center space-x-2 mt-2">
      <PhoneIcon style={{ fontSize: '1rem' }} />
      <p className="text-sm text-gray-600">{store.phone}</p>
    </div>
  )}
</div>
      
      {store.website && (
        <Button 
          variant="contained" 
          sx={{ backgroundColor: 'black', '&:hover': { backgroundColor: 'black' } }} 
          endIcon={<LaunchIcon />} 
          size="small"
          onClick={(e) => {
            e.stopPropagation(); // Prevent the store click event
            window.open(store.website, '_blank', 'noopener,noreferrer');
          }}
        >
          Visit
        </Button>
      )}
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



