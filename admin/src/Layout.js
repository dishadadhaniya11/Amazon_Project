import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import LoginIcon from '@mui/icons-material/Login';
import Path from './Common/Path';
import { Link, useLocation,Navigate } from 'react-router-dom';

const drawerWidth = 240;


function Layout(props) {

    const location = useLocation()
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const {Auth , content} = props

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
  {/* Dashboard.......................................... */}
                <Link to={Path.Dashboard} >
                    <ListItem disablePadding>
                        <ListItemButton selected={location.pathname === Path.Dashboard}>
                            <ListItemIcon>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Dashboard"} />
                        </ListItemButton>
                    </ListItem>
                </Link>
 {/* ProductScreen.......................................... */}
                <Link to={Path.ProductScreen} >
                    <ListItem disablePadding>
                        <ListItemButton selected={location.pathname === Path.ProductScreen}>
                            <ListItemIcon>
                                <CategoryIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Product"} />
                        </ListItemButton>
                    </ListItem>
                </Link>
{/* UserScreen.................................................... */}
                <Link to={Path.userScreen} >
                    <ListItem disablePadding>
                        <ListItemButton selected={location.pathname === Path.userScreen}>
                            <ListItemIcon>
                                <CategoryIcon />
                            </ListItemIcon>
                            <ListItemText primary={"User"} />
                        </ListItemButton>
                    </ListItem>
                </Link>

{/* LoginScreen........................................................ */}
                <Link to={Path.LoginScreen}>
                    <ListItem disablePadding>
                        <ListItemButton selected={location.pathname === Path.LoginScreen}>
                            <ListItemIcon>
                                <LoginIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Login"}/>
                        </ListItemButton>

                    </ListItem>
                </Link>

            </List>
        </div>
    );

    const container = window !== undefined ? () => window.document.body : undefined;

        if(!Auth){
            return <Navigate to = "/login"/>
        }
    
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `100%` },
                    ml: { sm: `${drawerWidth}px` },
                    zIndex: "100000"
                }}
            >
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
                        Responsive drawer
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                {
                    content
                }
            </Box>
        </Box>
    );
}

export default Layout;