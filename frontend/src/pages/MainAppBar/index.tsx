import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/authStore";
import { Roles } from "../../constants/roles";

const MainAppBar: React.FC = () => {
    const { token, role, logout } = useAuthStore();
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
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    SaaS Platform
                </Typography>
                <Button color="inherit" onClick={() => navigate("/")}>
                    Home
                </Button>
                {(role === Roles.Admin) && <Button color="inherit" onClick={() => navigate("/teams")}>
                    Teams
                </Button>}
                {(role === Roles.Admin) && <Button color="inherit" onClick={() => navigate("/catalog")}>
                    Catalog
                </Button>}
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