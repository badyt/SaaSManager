import React, { useState } from "react";
import {
    Box,
    Typography,
    Card,
    Button,
    Select,
    MenuItem,
    Grid2,
    Divider
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { toast } from "react-toastify";
import { useFetchAllSubscriptions } from "../../hooks/useSubscription";
import { useUsers } from "../../hooks/useUsers";
import { useAllocateLicense, useFetchLicenses } from "../../hooks/useLicense";
import { useQueryClient } from "react-query";
import { AxiosError } from "axios";
import SelectUserDialog from "./SelectUserDialog";
import { pageTitleStyles } from "../../styles/general";

const LicensePage: React.FC = () => {
    const { data: subscriptions } = useFetchAllSubscriptions();
    const { data: users } = useUsers(); // Fetch users to select from dialog
    const { data: licenses } = useFetchLicenses();
    const allocateLicenseMutation = useAllocateLicense();
    const queryClient = useQueryClient();

    const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null);
    const [selectedUser, setSelectedUser] = useState<UserDTO | null>(null);
    const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);

    const totalAllocatedLicenses = subscriptions
        ?.map((sub: Subscription) => sub.allocated_licenses)  // Extract allocated license count
        .reduce((sum: number, count: number) => sum + count, 0);
    const totalLicensesPurchased = subscriptions
        ?.map((sub: Subscription) => sub.license_count)  // Extract allocated license count

        .reduce((sum: number, count: number) => sum + count, 0);
    const handleAllocateLicense = () => {
        if (!selectedSubscription || !selectedUser) {
            toast.error("Please select a subscription and a user.");
            return;
        }

        allocateLicenseMutation.mutate(
            {
                subscription_id: selectedSubscription.subscription_id,
                user_id: selectedUser.userId,
            },
            {
                onSuccess: () => {
                    toast.success("License allocated successfully!");
                    setSelectedSubscription(null);
                    setSelectedUser(null);
                    queryClient.invalidateQueries(["licenses"]);
                },
                onError: (error) => {
                    const errorMessage = (error instanceof AxiosError) ? error.response?.data : error;
                    toast.error(`Error allocating license: ${errorMessage}`);
                },
            }
        );
    };

    return (
        <Box sx={{ padding: "2rem" }}>
            <Typography
                variant="h3"
                sx={pageTitleStyles}
            >
                License Management
            </Typography>

            {/* License Overview Section */}
            <Card sx={{ marginBottom: "2rem", padding: "1.5rem", boxShadow: 3 }}>
                <Typography
                    variant="h5"
                    sx={{ fontWeight: "bold", color: "#333", marginBottom: "1rem" }}
                >
                    Overview
                </Typography>
                <Divider sx={{ marginBottom: "1rem" }} />
                <Typography variant="body1"><b>Total Licenses:</b> {totalLicensesPurchased}</Typography>
                <Typography variant="body1"><b>Allocated Licenses:</b> {totalAllocatedLicenses}</Typography>
                <Typography variant="body1"><b>Unallocated Licenses:</b> {totalLicensesPurchased - totalAllocatedLicenses}</Typography>
            </Card>

            {/* License Allocation Section */}
            <Card sx={{ marginBottom: "2rem", padding: "1.5rem", boxShadow: 3 }}>
                <Typography
                    variant="h5"
                    sx={{ fontWeight: "bold", color: "#333", marginBottom: "1rem" }}
                >
                    Allocate License
                </Typography>
                <Divider sx={{ marginBottom: "1rem" }} />

                <Grid2 container spacing={1} alignItems="center">
                    <Grid2 sx={{
                        width: {
                            xs: "100%",
                            sm: "50%",
                            md: "33.33%",
                            lg: "25%",
                        }, padding: "8px"
                    }}>
                        <Select
                            fullWidth
                            displayEmpty
                            value={selectedSubscription?.subscription_id || ""}
                            onChange={(e) => {
                                const selected = subscriptions?.find((sub: Subscription) => sub.subscription_id === Number(e.target.value));
                                setSelectedSubscription(selected || null);
                            }}
                            sx={{ height: "45px" }}
                        >
                            <MenuItem value="" disabled>Select Subscription</MenuItem>
                            {subscriptions?.map((item: Subscription) => (
                                <MenuItem key={item.subscription_id} value={item.subscription_id}>
                                    {item.tool.name} - {item.license_count} licenses
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid2>

                    <Grid2 sx={{
                        width: {
                            xs: "100%",
                            sm: "50%",
                            md: "33.33%",
                            lg: "20%",
                        }, padding: "8px",
                    }}>
                        <Button
                            variant="outlined"
                            onClick={() => setIsUserDialogOpen(true)}
                            fullWidth
                            sx={{ height: "45px", fontWeight: "bold" }}
                        >
                            {selectedUser ? selectedUser.name : "Select User"}
                        </Button>
                    </Grid2>

                    <Grid2 sx={{
                        width: {
                            xs: "100%",
                            sm: "50%",
                            md: "33.33%",
                            lg: "25%",
                        },
                        padding: "8px",
                    }}>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<Add />}
                            onClick={handleAllocateLicense}
                            sx={{ height: "45px", fontWeight: "bold" }}
                        >
                            Allocate License
                        </Button>
                    </Grid2>
                </Grid2>
            </Card>

            {/* Recent License Activity Section */}
            <Card sx={{ padding: "1.5rem", boxShadow: 3 }}>
                <Typography
                    variant="h5"
                    sx={{ fontWeight: "bold", color: "#333", marginBottom: "1rem" }}
                >
                    Recent License Activity
                </Typography>
                <Divider sx={{ marginBottom: "1rem" }} />

                {licenses && licenses.length > 0 ? (
                    licenses.slice(-5).map((license: License) => (
                        <Box
                            key={license.license_id}
                            sx={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0" }}
                        >
                            <Typography variant="body2">
                                ✅ Subscription {license.subscription_id} for {license.tool_name} allocated to user {license.user_name}
                            </Typography>
                        </Box>
                    ))
                ) : (
                    <Typography variant="body2" color="textSecondary">
                        No recent license activity.
                    </Typography>
                )}
            </Card>

            {/* User Selection Dialog */}
            <SelectUserDialog isUserDialogOpen={isUserDialogOpen} users={users} setIsUserDialogOpen={setIsUserDialogOpen}
                setSelectedUser={setSelectedUser} />
        </Box>
    );
};

export default LicensePage;
