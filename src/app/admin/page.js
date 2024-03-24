
'use client'
import React, { useState,useEffect } from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Toolbar, Typography, AppBar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'; // Import the Menu (hamburger) icon
import StoreIcon from '@mui/icons-material/Store';
import DeleteIcon from '@mui/icons-material/Delete';
import { blue } from '@mui/material/colors';
import AddForm from './Addform';
import Showdel from './Showdel';
import SignIn from './Sign';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Firebase';
import LogoutIcon from '@mui/icons-material/Logout'; // Import Logout icon



const drawerWidth = 300;

const IndexPage = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [selectedComponent, setSelectedComponent] = useState('Component1');
    const [user, setUser] = useState(null);

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

    useEffect(() => {
        // Subscribe to auth changes
        const unsubscribe = onAuthStateChanged(auth, user => {
          if (user) {
            setUser(user);
          } else {
            setUser(null);
          }
        });
        // Cleanup subscription on unmount
        return () => unsubscribe();
      }, []);
    
      // Handle user sign-out
      const handleSignOut = () => {
        auth.signOut();
      };
    
      // ...rest of your component
    
      // If user is not signed in, show the SignIn component
      if (!user) {
        return <SignIn onSignIn={() => setUser(auth.currentUser)} />;
      }

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
    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
      Store Management
    </Typography>
    <IconButton
      color="inherit"
      aria-label="logout"
      edge="end"
      onClick={handleSignOut}
    >
      <LogoutIcon />
    </IconButton>
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
