import React, { useState } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    Button,
    Select,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Grid2,
    Divider
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { toast } from "react-toastify";
// import { useFetchCatalog } from "../../hooks/useCatalog";
import { useFetchAllSubscriptions } from "../../hooks/useSubscription";
import { useUsers } from "../../hooks/useUsers";
import { useAllocateLicense, useFetchLicenses, useRemoveLicense } from "../../hooks/useLicense";
import ConfirmDeleteDialog from "../../SharedComponents/ConfirmDeleteDialog";
import { useEnrichedSubscriptions } from "../../hooks/useEnrichedSubscriptions";

const LicensePage: React.FC = () => {
    // const { data: catalog } = useFetchCatalog();
    const { data: subscriptions } = useFetchAllSubscriptions();
    const { enrichedSubscriptions } = useEnrichedSubscriptions();
    console.log(enrichedSubscriptions);

    const { data: users } = useUsers(); // Fetch users to select from dialog
    const { data: licenses } = useFetchLicenses();
    const allocateLicenseMutation = useAllocateLicense();
    const removeLicenseMutation = useRemoveLicense();

    const [selectedSubscription, setSelectedSubscription] = useState<SubscriptionEnrichedEntity | null>(null);
    const [selectedUser, setSelectedUser] = useState<UserDTO | null>(null);
    const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    const [selectedLicenseId, setSelectedLicenseId] = useState<number | null>(null);

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
                subscription_id: selectedSubscription.subscription.subscription_id,
                user_id: selectedUser.userId,
            },
            {
                onSuccess: () => {
                    toast.success("License allocated successfully!");
                    setSelectedSubscription(null);
                    setSelectedUser(null);
                },
                onError: (error) => {
                    toast.error(`Error allocating license: ${error}`);
                },
            }
        );
    };


    const handleRemoveLicense = (licenseId: number) => {
        setSelectedLicenseId(licenseId);
        setIsConfirmDialogOpen(true);
    };

    const confirmRemoveLicense = () => {
        if (selectedLicenseId !== null) {
            removeLicenseMutation.mutate(selectedLicenseId, {
                onSuccess: () => {
                    toast.success("License removed successfully!");
                },
                onError: (error) => {
                    toast.error(`Error removing license: ${error}`);
                },
            });
        }
        setIsConfirmDialogOpen(false);
    };

    return (
        <Box sx={{ padding: "2rem" }}>
            <Typography variant="h4" gutterBottom>
                License Management
            </Typography>

            {/* License Overview Section */}
            <Card sx={{ marginBottom: "2rem", padding: "1.5rem", boxShadow: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Overview
                </Typography>
                <Divider sx={{ marginBottom: "1rem" }} />
                <Typography variant="body1">Total Licenses: {totalLicensesPurchased}</Typography>
                <Typography variant="body1">
                    Allocated Licenses: {totalAllocatedLicenses}
                </Typography>
                <Typography variant="body1">
                    Unallocated Licenses: {totalLicensesPurchased - totalAllocatedLicenses}
                </Typography>
            </Card>

            {/* License Allocation Section */}
            <Card sx={{ marginBottom: "2rem", padding: "1.5rem", boxShadow: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Allocate License
                </Typography>
                <Divider sx={{ marginBottom: "1rem" }} />

                <Grid2 container spacing={2} alignItems="center">
                    <Grid2 sx={{
                        width: {
                            xs: "100%",  // Full width on extra-small screens
                            sm: "50%",   // Half width on small screens
                            md: "33.33%", // One-third width on medium screens
                            lg: "25%",   // One-fourth width on large screens
                        },
                        padding: "8px",
                    }}>
                        <Select
                            fullWidth
                            displayEmpty
                            value={selectedSubscription?.subscription.subscription_id || ""}
                            onChange={(e) => {
                                const selected = enrichedSubscriptions?.find(sub => sub.subscription.subscription_id === Number(e.target.value));
                                setSelectedSubscription(selected || null);
                            }}
                        >
                            <MenuItem value="" disabled>Select Subscription</MenuItem>
                            {enrichedSubscriptions?.map((item) => (
                                <MenuItem key={item.subscription.subscription_id} value={item.subscription.subscription_id}>
                                    {item.tool.name} - {item.subscription.license_count} licenses
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid2>

                    <Grid2 sx={{
                        width: {
                            xs: "100%",  // Full width on extra-small screens
                            sm: "50%",   // Half width on small screens
                            md: "33.33%", // One-third width on medium screens
                            lg: "25%",   // One-fourth width on large screens
                        },
                        padding: "8px",
                    }}>
                        <Button
                            variant="contained"
                            onClick={() => setIsUserDialogOpen(true)}
                            fullWidth
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
                        display: "flex",
                        justifyContent: "center",
                        padding: "8px",
                    }}>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<Add />}
                            onClick={handleAllocateLicense}
                        >
                            Allocate License
                        </Button>
                    </Grid2>
                </Grid2>
            </Card>

            {/* Recent License Activity Section */}
            <Card sx={{ padding: "1.5rem", boxShadow: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Recent License Activity
                </Typography>
                <Divider sx={{ marginBottom: "1rem" }} />

                {subscriptions && subscriptions.length > 0 ? (
                    subscriptions.slice(-5).map((subscription: Subscription) => (
                        <Box
                            key={subscription.subscription_id}
                            sx={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0" }}
                        >
                            <Typography variant="body2">
                                ✅ Allocated to user {subscription.subscription_id}
                            </Typography>
                            <Button
                                color="error"
                                onClick={() => handleRemoveLicense(subscription.subscription_id)}
                            >
                                Remove
                            </Button>
                        </Box>
                    ))
                ) : (
                    <Typography variant="body2" color="textSecondary">
                        No recent license activity.
                    </Typography>
                )}
            </Card>

            {/* User Selection Dialog */}
            <Dialog open={isUserDialogOpen} onClose={() => setIsUserDialogOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Select a User</DialogTitle>
                <DialogContent>
                    <List>
                        {users?.map((user: UserDTO) => (
                            <ListItem key={user.userId} disablePadding>
                                <ListItemButton onClick={() => { setSelectedUser(user); setIsUserDialogOpen(false); }}>
                                    <ListItemText primary={user.name} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsUserDialogOpen(false)} color="secondary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Confirm Deletion Dialog */}
            <ConfirmDeleteDialog
                isConfirmOpen={isConfirmDialogOpen}
                setIsConfirmOpen={setIsConfirmDialogOpen}
                handleRemove={confirmRemoveLicense}
                item="License"
            />
        </Box>
    );
};

export default LicensePage;
