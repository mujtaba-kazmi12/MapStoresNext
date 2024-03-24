
'use client'
import React, { useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import StoreIcon from '@mui/icons-material/Store';
import DeleteIcon from '@mui/icons-material/Delete';
import { blue } from '@mui/material/colors';
import AddForm from './Addform'

const drawerWidth = 240;

// Placeholder components for demonstration
const Component1 = () => <div>Component 1 Content</div>;
const Component2 = () => <div>Component 2 Content</div>;

const IndexPage = () => {
    const [selectedComponent, setSelectedComponent] = useState('Component1');

    const components = {
        Component1: <AddForm />,
        Component2: <Component2 />,
        // Add more components here
    };

    const sidebarItems = [
        { text: 'Add Store', component: 'Component1', icon: <StoreIcon /> },
        { text: 'Delete Store', component: 'Component2', icon: <DeleteIcon /> },
        // Add more items as needed
    ];

    return (
        <Box sx={{ display: 'flex' }}>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        backgroundColor: blue[800], // Feel free to choose another color
                        color: "#FFFFFF",
                    },
                }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Store Management
                    </Typography>
                </Toolbar>
                <List>
                    {sidebarItems.map((item, index) => (
                        <ListItem 
                            button 
                            key={index} 
                            onClick={() => setSelectedComponent(item.component)}
                            sx={{
                                '&:hover': {
                                    backgroundColor: blue[900], // Darken the item on hover
                                }
                            }}
                        >
                            <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                {components[selectedComponent]}
            </Box>
        </Box>
    );
};

export default IndexPage;

