import React, { useState } from "react";
import { Box, Typography, Paper, Card, CardActionArea, CardContent, Button, Grid2, Divider } from "@mui/material";
import { pageTitleStyles } from "../../styles/general";
import SubscriptionCosts from "./SubscriptionCosts";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AllocatedLicenses from "./AllocatedLicenses";
import UnderutilizedCosts from "./UnderutilizedCosts";

const ReportsPage: React.FC = () => {
    const [selectedReport, setSelectedReport] = useState<string | null>(null);

    // Function to render selected report
    const renderReport = () => {
        switch (selectedReport) {
            case "subscriptionsCosts":
                return <SubscriptionCosts />;
            case "allocatedLicenses":
                return <AllocatedLicenses />;
            case "underutilizedLicenses":
                return <UnderutilizedCosts />;
            default:
                return null; 
        }
    };

    return (
        <Box sx={{ p: 4 }}>
            {/* Show Report OR Selection */}
            {selectedReport ? (
                <Box>
                    <Button variant="contained" 
                    sx={{
                        top: "-1.5rem",
                        right: "1.5rem"
                    }}
                    color="secondary" onClick={() => setSelectedReport(null)}>
                        <ArrowBackIcon />
                    </Button>

                    {/* Render Selected Report */}
                    <Paper sx={{
                        p: 2, minHeight: "300px", display: "flex", alignItems: "center", justifyContent: "center",
                        backgroundColor: "transparent", boxShadow: "none"
                    }}>
                        {renderReport()}
                    </Paper>
                </Box>
            ) : (
                <>
                    <Typography variant="h4" textAlign={"center"} sx={pageTitleStyles}>
                        Reports Dashboard
                    </Typography>
                    <Divider />

                    <Grid2 container spacing={3} justifyContent="center" sx={{ mt: 3 }}>
                        {[
                            { id: "subscriptionsCosts", title: "Subscriptions cost", description: "costs subscriptions, allocated licenses." },
                            { id: "allocatedLicenses", title: "Allocated licenses", description: "costs for licenses for a team/user." },
                            { id: "underutilizedLicenses", title: "Underutilized licenses", description: "Total costs for underutilized licenses." }
                        ].map(({ id, title, description }) => (
                            <Grid2 sx={{
                                width: {
                                    xs: "100%",
                                    sm: "50%",
                                    md: "33.33%",
                                    lg: "25%",
                                }, padding: "8px"
                            }} key={id}>
                                <Card
                                    sx={{
                                        width: 300,
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                        cursor: "pointer",
                                    }}
                                >
                                    <CardActionArea onClick={() => setSelectedReport(id)}>
                                        <CardContent>
                                            <Typography variant="h6" gutterBottom>
                                                {title}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                {description}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid2>
                        ))}
                    </Grid2>
                </>
            )}
        </Box>
    );
};

export default ReportsPage;
