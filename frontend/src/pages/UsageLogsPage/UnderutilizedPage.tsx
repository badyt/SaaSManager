import React, { useState } from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    CircularProgress,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";
import { useFetchUnderutilizedSubscriptions } from "../../hooks/useUsageLogs";

const UnderutilizedPage = () => {
    const [filters, setFilters] = useState({ threshold: 5, period: "30d" });

    const { data: underutilizedSubscriptions, isLoading, isError } =
        useFetchUnderutilizedSubscriptions(filters);

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: name === "threshold" ? Number(value) : value,
        }));
    };

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" sx={{ mb: 3 }}>
                Underutilized Subscriptions
            </Typography>

            {/* Filter Section */}
            <Box
                sx={{
                    display: "flex",
                    gap: 2,
                    mb: 3,
                    flexWrap: "wrap",
                }}
            >
                <TextField
                    label="Threshold"
                    name="threshold"
                    type="number"
                    value={filters.threshold}
                    onChange={handleFilterChange}
                    variant="outlined"
                    sx={{ width: { xs: "100%", sm: "200px" } }}
                />
                <TextField
                    label="Period"
                    name="period"
                    value={filters.period}
                    onChange={handleFilterChange}
                    variant="outlined"
                    sx={{ width: { xs: "100%", sm: "200px" } }}
                />
                <Button variant="contained" color="primary" onClick={() => { }}>
                    Apply Filters
                </Button>
            </Box>

            {/* Subscriptions List */}
            {isLoading ? (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                    <CircularProgress />
                </Box>
            ) : isError ? (
                <Typography color="error" align="center">
                    Error fetching underutilized subscriptions!
                </Typography>
            ) : (
                <List>
                    {underutilizedSubscriptions?.length > 0 ? (
                        underutilizedSubscriptions.map((sub: any) => (
                            <ListItem key={sub.subscriptionId}>
                                <ListItemText
                                    primary={`Subscription ID: ${sub.subscriptionId}`}
                                    secondary={`User ID: ${sub.userId}, Activity Count: ${sub.activityCount}`}
                                />
                            </ListItem>
                        ))
                    ) : (
                        <Typography align="center">No underutilized subscriptions found.</Typography>
                    )}
                </List>
            )}
        </Box>
    );
};

export default UnderutilizedPage;
