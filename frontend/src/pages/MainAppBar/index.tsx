import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/authStore";
import MenuIcon from '@mui/icons-material/Menu';
import SideDrawer from "../SideDrawer";

const MainAppBar: React.FC = () => {
    const { token, logout } = useAuthStore();
    const [openDrawer, setDrawer] = useState(false);
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const getBarContent = () => {
        if (!token)
            return <Toolbar><Typography variant="h6" sx={{ flexGrow: 1 }}>
                SaaS Platform
            </Typography> </Toolbar>
        else
            return <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={() => setDrawer(!openDrawer)}
                >
                    <MenuIcon />
                </IconButton>
                <SideDrawer setDrawer={(value) => setDrawer(value)} isOpen={openDrawer} />
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    SaaS Platform
                </Typography>
                <Button color="inherit" onClick={() => navigate("/")}>
                    Home
                </Button>
                <Button color="inherit" onClick={() => navigate("/profile")}>
                    Profile
                </Button>
                <Button color="inherit" onClick={handleLogout}>
                    Logout
                </Button>
            </Toolbar>
    }

    return (
        <AppBar position="static" color="primary">
            {getBarContent()}
        </AppBar>
    )
}

export default MainAppBar;