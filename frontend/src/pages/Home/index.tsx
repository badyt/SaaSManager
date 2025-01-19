import React from "react";
import { Typography, Box, Card, CardContent, Avatar, Container } from "@mui/material";
import useAuthStore from "../../stores/authStore";
import { Navigate, useNavigate } from "react-router-dom";
import { Roles } from "../../constants/roles";

const Home = () => {
    const { username, token, role } = useAuthStore();
    const navigate = useNavigate();

    if (!token)
        return <Navigate to="/login" />;

    const userFeatures = [
        {
            title: "Profile Management",
            description: "View and update your profile details.",
            onClick: () => navigate("/profile"),
        },
        {
            title: "View Dashboard",
            description: "Placeholder for future analytics and dashboard functionality.",
            onClick: () => navigate("/users"),
        },
    ];

    const adminFeatures = [
        ...userFeatures,
        {
            title: "Manage Teams",
            description: "Create, manage, and assign users to teams.",
            onClick: () => navigate("/teams"),
        },
        {
            title: "View Catalog",
            description: "View and manage Catalog.",
            onClick: () => navigate("/catalog")
        },
        {
            title: "View Subscriptions",
            description: "View and manage Subscriptions.",
            onClick: () => navigate("/subscriptions")
        },
        
    ];

    const features = (role === Roles.Admin) ? adminFeatures : userFeatures;

    return (
        <Container>
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
                    Welcome, {username}!
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
