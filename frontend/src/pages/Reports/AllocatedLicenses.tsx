import React, { useState } from "react";
import {
    Box, Typography, Paper, Select, MenuItem, FormControl, InputLabel, Button, Dialog, DialogTitle, DialogContent, DialogActions
} from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useFetchLicensesByTeam, useFetchLicensesByUser } from "../../hooks/useLicense";
import { useFetchAllTeams } from "../../hooks/useTeams";
import { useUsers } from "../../hooks/useUsers";

const AllocatedLicenses: React.FC = () => {
    const { data: teams } = useFetchAllTeams();
    const { data: users } = useUsers();

    const [viewMode, setViewMode] = useState<string>("team"); // Default to team search
    const [selectedId, setSelectedId] = useState<number | undefined>(undefined);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    // Fetch allocated licenses based on selection
    const { data: allocatedLicenses, isLoading } =
        viewMode === "team" ? useFetchLicensesByTeam(selectedId) : useFetchLicensesByUser(selectedId);

    if (isLoading) return <Typography>Loading licenses...</Typography>;


    // Compute total allocated licenses count & cost
    const totalAllocatedLicenses = allocatedLicenses?.length || 0;
    const totalAllocatedCost = allocatedLicenses?.reduce((acc: number, lic: License) => acc + lic.cost, 0) || 0;

    // Chart Data
    const chartData = [
        { name: "Allocated Licenses", count: totalAllocatedLicenses, cost: totalAllocatedCost }
    ];

    // Dynamic Title
    const selectedItem = viewMode === "team"
        ? teams?.find((team: TeamDTO) => team.id === selectedId)
        : users?.find((user: UserDTO) => user.userId === selectedId);

    const title = selectedId
        ? `Allocated Licenses for ${viewMode === "team" ? "Team" : "User"}: ${selectedItem.name}`
        : "Select a Team or User to View Allocated Licenses";

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

            {/* View Mode Selection Buttons */}
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 3 }}>
                {["team", "user"].map((mode) => (
                    <Button
                        key={mode}
                        variant={viewMode === mode ? "contained" : "outlined"}
                        onClick={() => { setViewMode(mode); setSelectedId(undefined); }}
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
                        {mode === "team" ? "Search by Team" : "Search by User"}
                    </Button>
                ))}
            </Box>

            {/* Selection Dropdown */}
            <FormControl sx={{ mb: 3, minWidth: 250 }}>
                <InputLabel>{viewMode === "team" ? "Select Team" : "Select User"}</InputLabel>
                <Select
                    value={selectedId || ""}
                    onChange={(e) => setSelectedId(Number(e.target.value))}
                >
                    {(viewMode === "team" ? teams : users)?.map((item: TeamDTO | UserDTO) => (
                        <MenuItem
                            key={viewMode === "team" ? (item as TeamDTO).id : (item as UserDTO).userId}
                            value={viewMode === "team" ? (item as TeamDTO).id : (item as UserDTO).userId}
                        >
                            {item.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

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
                {allocatedLicenses && allocatedLicenses.length > 0 && (
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
                    {allocatedLicenses?.map((lic: License) => (
                        <Typography key={lic.license_id}>
                            {lic.user_name} - {lic.tool_name} (Cost: ${lic.cost})
                        </Typography>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)}>Close</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default AllocatedLicenses;
