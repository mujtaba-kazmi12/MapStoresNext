'use client'


import React, { useEffect, useState } from 'react';
import { db } from '../Firebase'; // Ensure this path is correct
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const StoreList = () => {
  const [stores, setStores] = useState([]);
  const [editStoreId, setEditStoreId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    address: '',
    zip: '',
    city: '',
    country: '',
    email: '',
    phone: '',
    website: '',
    position: [0, 0],
  });

  useEffect(() => {
    const fetchStores = async () => {
      const querySnapshot = await getDocs(collection(db, "stores"));
      const storeData = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
      setStores(storeData);
    };

    fetchStores();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "stores", id));
    setStores(stores.filter(store => store.id !== id));
  };

  const handleEdit = (store) => {
    setEditStoreId(store.id);
    setEditFormData({
      name: store.name,
      address: store.address,
      zip: store.zip,
      city: store.city,
      country: store.country,
      email: store.email,
      phone: store.phone,
      website: store.website,
      position: store.position,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  const handleEditSave = async (id) => {
    // Prepare the updateData with parsed position values
    const updateData = {
      ...editFormData,
      position: editFormData.position.map(coord => parseFloat(coord) || 0)
    };
  
    try {
      // Update the document in Firestore
      await updateDoc(doc(db, "stores", id), updateData);
  
      // Update local state to reflect the changes
      const updatedStores = stores.map((store) => {
        if (store.id === id) {
          return { ...store, ...updateData };
        } else {
          return store;
        }
      });
  
      setStores(updatedStores);
      setEditStoreId(null); // Reset the editing state
      alert('Store updated successfully');
    } catch (error) {
      console.error("Error updating document: ", error);
      alert('Error updating store');
    }
  };
  

  return (
    <Box sx={{ p: 3 }}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {stores.map(store => (
          <div key={store.id} className="bg-white shadow-md rounded-lg overflow-hidden relative">
            <div className="p-4 mt-8">
              {editStoreId === store.id ? (
                <>
                  <TextField name="name" label="Name" value={editFormData.name} onChange={handleEditChange} fullWidth sx={{ mb: 1 }}/>
                  <TextField name="address" label="Address" value={editFormData.address} onChange={handleEditChange} fullWidth sx={{ mb: 1 }}/>
                  <TextField name="position" label="Latitude" value={editFormData.position[0]} onChange={(e) => setEditFormData({ ...editFormData, position: [e.target.value, editFormData.position[1]] })} fullWidth sx={{ mb: 1 }}/>
                  <TextField name="position" label="Longitude" value={editFormData.position[1]} onChange={(e) => setEditFormData({ ...editFormData, position: [editFormData.position[0], e.target.value] })} fullWidth sx={{ mb: 1 }}/>
                  <TextField name="zip" label="Zip" value={editFormData.zip} onChange={handleEditChange} fullWidth sx={{ mb: 1 }}/>
                  <TextField name="city" label="City" value={editFormData.city} onChange={handleEditChange} fullWidth sx={{ mb: 1 }}/>
                  <TextField name="country" label="Country" value={editFormData.country} onChange={handleEditChange} fullWidth sx={{ mb: 1 }}/>
                  <TextField name="email" label="Email" value={editFormData.email} onChange={handleEditChange} fullWidth sx={{ mb: 1 }}/>
                  <TextField name="phone" label="Phone Number" value={editFormData.phone} onChange={handleEditChange} fullWidth sx={{ mb: 1 }}/>
                  <TextField name="website" label="Website URL" value={editFormData.website} onChange={handleEditChange} fullWidth sx={{ mb: 1 }}/>
                  <Button onClick={() => handleEditSave(store.id)}>Save</Button>
                </>
              ) : (
                <>
  <h2 className="text-xl font-semibold mb-2">{store.name}</h2>
  <p className="text-gray-700">{store.address}</p>
  <p className="text-gray-600">Zip: {store.zip}</p>
  <p className="text-gray-600">City: {store.city}</p>
  <p className="text-gray-600">Country: {store.country}</p>
  <p className="text-gray-600">Email: {store.email}</p>
  <p className="text-gray-600">Phone: {store.phone}</p>
  <p className="text-gray-600">Website: <a href={store.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">{store.website}</a></p>
  <div className="mt-3">
    <p className="text-gray-600">Latitude: {store.position[0]}</p>
    <p className="text-gray-600">Longitude: {store.position[1]}</p>
  </div>
</>

              )}
            </div>
           
          <div className="absolute top-0 right-10 p-2">
            <DeleteIcon onClick={() => handleDelete(store.id)} className="cursor-pointer text-red-600 hover:text-red-800" />
          </div>
          <div className="absolute top-0 right-0 p-2">
            <EditIcon onClick={() => handleEdit(store)} className="cursor-pointer text-blue-600 hover:text-blue-800" />
          </div>
        </div>
      ))}
    </div>
  </Box>
);
};

export default StoreList;

