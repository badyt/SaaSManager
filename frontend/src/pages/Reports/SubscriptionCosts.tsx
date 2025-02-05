import React, { useState } from "react";
import { Box, Typography, Paper, Select, MenuItem, FormControl, InputLabel, Button } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useFetchAllSubscriptions } from "../../hooks/useSubscription"; // Import your existing query hook

const SubscriptionCosts: React.FC = () => {
    const { data: subscriptions, isLoading, isError } = useFetchAllSubscriptions();
    const [viewMode, setViewMode] = useState<string>("totalCost"); // Default view
    const [selectedSubscription, setSelectedSubscription] = useState<number | null>(null);

    if (isLoading) return <Typography>Loading subscriptions...</Typography>;
    if (isError) return <Typography color="error">Error fetching subscriptions.</Typography>;

    // Compute total subscription cost
    const totalSubscriptionCost = subscriptions.reduce((acc: number, sub: Subscription) => acc + sub.cost, 0);
    const totalLicenseCount = subscriptions.reduce((acc: number, sub: Subscription) => acc + sub.license_count, 0);

    // Compute allocated & unallocated license costs
    const totalAllocatedCost = subscriptions.reduce((acc: number, sub: Subscription) => acc + sub.allocated_licenses * sub.tool.default_cost, 0);
    const totalUnallocatedCost = subscriptions.reduce((acc: number, sub: Subscription) => acc + (sub.license_count - sub.allocated_licenses) * sub.tool.default_cost, 0);

    // Compute license counts
    const totalAllocatedLicenses = subscriptions.reduce((acc: number, sub: Subscription) => acc + sub.allocated_licenses, 0);
    const totalUnallocatedLicenses = totalLicenseCount - totalAllocatedLicenses;

    // Compute cost for a specific subscription (if selected)
    const selectedSub = subscriptions.find((sub: Subscription) => sub.subscription_id === selectedSubscription);
    const selectedSubAllocatedCost = selectedSub ? selectedSub.allocated_licenses * selectedSub.tool.default_cost : 0;
    const selectedSubUnallocatedCost = selectedSub ? (selectedSub.license_count - selectedSub.allocated_licenses) * selectedSub.tool.default_cost : 0;
    const selectedSubTotalLicenses = selectedSub ? selectedSub.license_count : 0;
    const selectedSubAllocatedLicenses = selectedSub ? selectedSub.allocated_licenses : 0;
    const selectedSubUnallocatedLicenses = selectedSubTotalLicenses - selectedSubAllocatedLicenses;

    // Data for bar chart
    const chartData = [
        { name: "Total Subscriptions", cost: totalSubscriptionCost, licenses: totalLicenseCount },
        { name: "Allocated Licenses", cost: totalAllocatedCost, licenses: totalAllocatedLicenses },
        { name: "Unallocated Licenses", cost: totalUnallocatedCost, licenses: totalUnallocatedLicenses },
    ];

    const selectedSubChartData = selectedSub ? [
        { name: "Allocated Licenses", cost: selectedSubAllocatedCost, licenses: selectedSubAllocatedLicenses },
        { name: "Unallocated Licenses", cost: selectedSubUnallocatedCost, licenses: selectedSubUnallocatedLicenses },
    ] : [];

    return (
        <Box sx={{ p: 1, textAlign: "center" }}>
            <Typography
                variant="h4"
                sx={{
                    mb: 3,
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: "600",
                    letterSpacing: "1px",
                    color: "#222"
                }}
            >
                Subscription Costs Overview
            </Typography>

            {/* View Selection Buttons */}
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 3 }}>
                {["totalCost", "specificSubscription"].map((mode) => (
                    <Button
                        key={mode}
                        variant={viewMode === mode ? "contained" : "outlined"}
                        onClick={() => setViewMode(mode)}
                        sx={{
                            fontSize: "16px",
                            fontWeight: "500",
                            letterSpacing: "0.5px",
                            textTransform: "none",
                            borderRadius: "8px",
                            transition: "0.3s",
                            "&:hover": {
                                backgroundColor: viewMode === mode ? "#0056b3" : "#f3f3f3",
                                transform: "scale(1.05)"
                            }
                        }}
                    >
                        {mode === "totalCost" ? "Total Subscription Cost" : "Specific Subscription Cost"}
                    </Button>
                ))}
            </Box>

            {/* Filter by Subscription */}
            {viewMode === "specificSubscription" && (
                <FormControl sx={{ mb: 3, minWidth: 250 }}>
                    <InputLabel>Select Subscription</InputLabel>
                    <Select
                        value={selectedSubscription || ""}
                        onChange={(e) => setSelectedSubscription(Number(e.target.value))}
                    >
                        {subscriptions.map((sub: Subscription) => (
                            <MenuItem key={sub.subscription_id} value={sub.subscription_id}>
                                {sub.tool.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}

            {/* Display Chart Based on Selection */}
            <Paper sx={{
                p: 4,
                minHeight: "300px",
                display: "flex",
                minWidth:"40rem",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f9f9f9",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                borderRadius: "12px"
            }}>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={viewMode === "specificSubscription" ? selectedSubChartData : chartData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="cost" fill="#007bff" name="Cost ($)" />
                        <Bar dataKey="licenses" fill="#28a745" name="Licenses Count" />
                    </BarChart>
                </ResponsiveContainer>
            </Paper>
        </Box>
    );
};

export default SubscriptionCosts;
