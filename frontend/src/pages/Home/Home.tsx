import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, Card, CardContent, Avatar, Container } from "@mui/material";
import useAuthStore from "../../stores/authStore";
import { Navigate, useNavigate } from "react-router-dom";

const Home = () => {
    const { token, logout } = useAuthStore();
    const navigate = useNavigate();

    if (!token)
        return <Navigate to="/login" />;

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const features = [
        {
            title: "Manage Teams",
            description: "Create, manage, and assign users to teams.",
            onClick: () => navigate("/teams"),
        },
        {
            title: "Profile Management",
            description: "View and update your profile details.",
            onClick: () => navigate("/profile"),
        },
        {
            title: "View Dashboard",
            description: "Placeholder for future analytics and dashboard functionality.",
            onClick: () => alert("Coming soon!"),
        },
    ];

    return (
        <Container>
            {/* Navigation Bar */}
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        SaaS Platform
                    </Typography>
                    <Button color="inherit" onClick={() => navigate("/")}>
                        Home
                    </Button>
                    <Button color="inherit" onClick={() => navigate("/teams")}>
                        Teams
                    </Button>
                    <Button color="inherit" onClick={() => navigate("/profile")}>
                        Profile
                    </Button>
                    <Button color="inherit" onClick={handleLogout}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>

            {/* Welcome Section */}
            <Box sx={{ my: 5, textAlign: "center" }}>
                <Avatar
                    sx={{
                        width: 80,
                        height: 80,
                        mx: "auto",
                        bgcolor: "primary.main",
                        mb: 2,
                    }}
                >
                    U
                </Avatar>
                <Typography variant="h4" gutterBottom>
                    Welcome, User!
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    Manage your teams and profile, or explore the dashboard.
                </Typography>
            </Box>

            {/* Feature Sections */}
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 2,
                    justifyContent: "center",
                }}
            >
                {features.map((feature, index) => (
                    <Card
                        key={index}
                        sx={{
                            width: 300,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            cursor: "pointer",
                        }}
                        onClick={feature.onClick}
                    >
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                {feature.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {feature.description}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Container>
    );
};

export default Home;
