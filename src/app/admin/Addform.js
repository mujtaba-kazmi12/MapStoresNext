import React, { useState } from 'react';
import { db } from '../Firebase'; // Update with the path to your Firebase config file
import { collection, addDoc } from 'firebase/firestore';
import { TextField,  Box, CssBaseline, Paper,Typography } from '@mui/material';

const StoreForm = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [longitude, setLongitude] = useState('');
    const [latitude, setLatitude] = useState('');
    const [formErrors, setFormErrors] = useState({});

    const validateForm = () => {
        let errors = {};
        if (!name) errors.name = 'Store Name is required';
        if (!address) errors.address = 'Address is required';
        if (!latitude) errors.latitude = 'Latitude is required';
        if (!longitude) errors.longitude = 'Longitude is required';
        setFormErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const newStore = {
                name,
                address,
                position: [parseFloat(latitude), parseFloat(longitude)]
            };

            await addDoc(collection(db, "stores"), newStore);

            alert('Store added successfully');
            setName('');
            setAddress('');
            setLongitude('');
            setLatitude('');
        } catch (error) {
            console.error("Error adding document: ", error);
            alert('Error adding store');
        }
    };

    return (
        <Box sx={{ display: 'flex', height: '70vh' }}>
            <CssBaseline />
            <Box
                component={Paper}
                elevation={6}
                square
                sx={{
                    my: 8,
                    mx: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    p: 3
                }}
            >
                <Typography component="h1" variant="h5">
                    Add New Store
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Store Name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        error={!!formErrors.name}
                        helperText={formErrors.name || ''}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="address"
                        label="Address"
                        id="address"
                        autoComplete="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        error={!!formErrors.address}
                        helperText={formErrors.address || ''}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="latitude"
                        label="Latitude"
                        id="latitude"
                        autoComplete="latitude"
                        type="number"
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                        error={!!formErrors.latitude}
                        helperText={formErrors.latitude || ''}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="longitude"
                        label="Longitude"
                        id="longitude"
                        autoComplete="longitude"
                        type="number"
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                        error={!!formErrors.longitude}
                        helperText={formErrors.longitude || ''}
                    />
                     <button
        type="submit"
        className={`w-full mt-3 mb-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 `}
        
      >
        Add Store
      </button>
                </Box>
            </Box>
        </Box>
    );
};

export default StoreForm;
