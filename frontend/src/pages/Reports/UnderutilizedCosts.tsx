import React, { useState } from "react";
import { useFetchUnderutilizedLicenses } from "../../hooks/useUsageLogs";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, TextField, Typography } from "@mui/material";
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";

const UnderutilizedCosts: React.FC = () => {
    const [filters, setFilters] = useState({ threshold: 5, period: "30d" });
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const queryClient = useQueryClient();
    const { data: underutilizedLicenses, isLoading, isError } =
        useFetchUnderutilizedLicenses(filters);

    if (isLoading) return <Typography>Loading licenses...</Typography>;
    if (isError) toast.error(`error fetching data, make sure the syntax in filter is right!`);
    const totalUnderutilizedLicenses = underutilizedLicenses?.length || 0;
    const totalCost = underutilizedLicenses?.reduce((acc: number, lic: UnderutilizedLicense) => acc + lic.licenseCost, 0) || 0;


    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: name === "threshold" ? Number(value) : value,
        }));
    };

    const chartData = [
        { name: "Allocated Licenses", count: totalUnderutilizedLicenses, cost: totalCost }
    ];

    const title =
        `Underutilized Licenses in the last ${filters.period.slice(0, 1)}`

    return (
        <Box sx={{ p: 4, textAlign: "center", backgroundColor: "transparent" }}>
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
                {title}
            </Typography>

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
                <Button variant="contained" color="primary" onClick={() => { queryClient.refetchQueries(["underutilizedLicenses"]); }}>
                    Apply Filters
                </Button>
            </Box>

            {/* Chart Section */}
            <Paper sx={{
                p: 4,
                minHeight: "300px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f9f9f9",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                borderRadius: "12px",
                position: "relative"
            }}>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="cost" fill="#007bff" name="Cost ($)" />
                        <Bar dataKey="count" fill="#28a745" name="Licenses Count" />
                    </BarChart>
                </ResponsiveContainer>
                {underutilizedLicenses && underutilizedLicenses.length > 0 && (
                    <Button
                        variant="contained"
                        sx={{ position: "absolute", bottom: "10px", right: "10px" }}
                        onClick={() => setDialogOpen(true)}
                    >
                        View License Details
                    </Button>
                )}
            </Paper>

            {/* Dialog for License List */}
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogTitle>Allocated Licenses Details</DialogTitle>
                <DialogContent>
                    {underutilizedLicenses?.map((lic: UnderutilizedLicense) => (
                        <Typography key={lic.licenseId}>
                            {lic.userName} - {lic.toolName} (Cost: ${lic.licenseCost})
                        </Typography>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)}>Close</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default UnderutilizedCosts;