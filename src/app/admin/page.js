
'use client'
import React, { useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Toolbar, Typography, AppBar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'; // Import the Menu (hamburger) icon
import StoreIcon from '@mui/icons-material/Store';
import DeleteIcon from '@mui/icons-material/Delete';
import { blue } from '@mui/material/colors';
import AddForm from './Addform';
import Showdel from './Showdel';

const drawerWidth = 300;

const IndexPage = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [selectedComponent, setSelectedComponent] = useState('Component1');

    const components = {
        Component1: <AddForm />,
        Component2: <Showdel />,
        // Add more components here
    };

    const sidebarItems = [
        { text: 'Add Store', component: 'Component1', icon: <StoreIcon /> },
        { text: 'Delete Store', component: 'Component2', icon: <DeleteIcon /> },
        // Add more items as needed
    ];

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Store Management
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            >
                {/* Temporary Drawer for xs screens */}
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 260, backgroundColor: blue[800] },
                    }}
                >
                    <Toolbar />
                    <List>
                        {sidebarItems.map((item, index) => (
                            <ListItem 
                                button 
                                key={index} 
                                onClick={() => setSelectedComponent(item.component)}
                            >
                                <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} sx={{ color: 'white' }} />
                            </ListItem>
                        ))}
                    </List>
                    {/* Drawer content */}
                </Drawer>
                {/* Permanent Drawer for sm screens and up */}
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: blue[800] },
                    }}
                    open
                >
                    <Toolbar />
                    <List>
                        {sidebarItems.map((item, index) => (
                            <ListItem 
                                button 
                                key={index} 
                                onClick={() => setSelectedComponent(item.component)}
                            >
                                <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} sx={{ color: 'white' }} />
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
            </Box>
            <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, pt: { xs: 7, sm: 8 } }}>
                {components[selectedComponent]}
            </Box>
        </Box>
    );
};

export default IndexPage;
