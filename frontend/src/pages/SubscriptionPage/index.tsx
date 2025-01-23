import React, { useState } from "react";
import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    CardActions,
    TextField,
    IconButton,
    Grid2,
} from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import { toast } from "react-toastify";
import { useCreateSubscription, useDeleteSubscription, useFetchAllSubscriptions, useUpdateSubscription } from "../../hooks/useSubscription";
import AddSubscriptionDialog from "./AddSubscriptionDialog";
import { useQueryClient } from "react-query";
import { useFetchCatalog } from "../../hooks/useCatalog";
import EditSubscriptionDialog from "./EditSubscriptionDialog";
import ConfirmDeleteDialog from "../../SharedComponents/ConfirmDeleteDialog";



const SubscriptionPage: React.FC = () => {
    // const { data: subscriptions } = useFetchAllSubscriptions();
    const { data: catalog } = useFetchCatalog();
    const { data: subscriptions } = useFetchAllSubscriptions();
    const [searchQuery, setSearchQuery] = useState("");
    const queryClient = useQueryClient();
    const addSubscriptionMutation = useCreateSubscription();
    const removeSubscriptionMutation = useDeleteSubscription();
    const updateSubscriptionMutation = useUpdateSubscription();
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null);
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

    const handleAddSubscription = (subscription: { tool_id: number; renewal_date: string; cost: number, license_count: number }) => {
        addSubscriptionMutation.mutate(subscription
            , {
                onSuccess: () => {
                    toast.success("successfully created subscription!");
                    queryClient.invalidateQueries(["subscriptions"]);
                },
                onError: (error) => { toast.error(`error occurred creating subscription: ${error}`) }
            });
    };

    const handleDeleteSubscription = (subscriptionId: number | undefined) => {
        if (subscriptionId)
            removeSubscriptionMutation.mutate(subscriptionId
                , {
                    onSuccess: () => {
                        toast.success("successfully removed subscription!");
                        queryClient.invalidateQueries(["subscriptions"]);
                        setSelectedSubscription(null);
                        setIsConfirmDialogOpen(false);
                    },
                    onError: (error) => {
                        toast.error(`error occurred deleting the subscription: ${error}`);
                        setSelectedSubscription(null);
                        setIsConfirmDialogOpen(false);
                    }

                });
        else
            toast.error("couldnt read properly the subscription id to delete!")
    };

    const handleUpdateSubscription = (updatedSubscription: {
        subscription_id: number;
        renewal_date: string;
        cost: number;
        license_count: number;
    }) => {
        updateSubscriptionMutation.mutate(updatedSubscription, {
            onSuccess: () => {
                toast.success("Subscription updated successfully!");
                queryClient.invalidateQueries(["subscriptions"]);
            },
            onError: (error) => {
                toast.error(`Error updating subscription: ${error}`);
            }
        });
    };

    const filteredSubscriptions = subscriptions?.filter((item: Subscription) =>
        item.tool.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Box sx={{ padding: "2rem" }}>
            <Typography variant="h4" gutterBottom>
                Subscription Management
            </Typography>

            <Box sx={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
                <TextField
                    label="Search Subscriptions"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button variant="contained" color="primary"
                    sx={{
                        whiteSpace: "nowrap"
                    }}
                    onClick={() => setIsAddDialogOpen(true)}>
                    <Add sx={{ marginRight: "0.2rem" }} /> Add Subscription
                </Button>
            </Box>

            <Grid2 container spacing={2}>
                {filteredSubscriptions?.map((item: Subscription) => (
                    <Grid2
                        key={item.subscription_id}
                        sx={{
                            width: {
                                xs: "100%",  // Full width on extra-small screens
                                sm: "50%",   // Half width on small screens
                                md: "33.33%", // One-third width on medium screens
                                lg: "25%",   // One-fourth width on large screens
                            },
                            padding: "8px",
                        }}
                    >
                        <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                            <CardContent>
                                <Typography variant="h6">{item.tool.name}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Renewal Date: {new Date(item.renewal_date).toLocaleDateString()}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Cost: ${item.cost.toFixed(2)}
                                </Typography>
                                {/* <Typography variant="body2" color="text.secondary">
                                    Assigned Users: {item.assignedUsers}
                                </Typography> */}
                            </CardContent>
                            <CardActions>
                                <IconButton
                                    color="primary"
                                    onClick={() => {
                                        setSelectedSubscription(item);
                                        setIsEditDialogOpen(true);
                                    }}
                                >
                                    <Edit />
                                </IconButton>
                                <IconButton
                                    color="error"
                                    onClick={() => {
                                        setSelectedSubscription(item);
                                        setIsConfirmDialogOpen(true);
                                    }}
                                >
                                    <Delete />
                                </IconButton>
                            </CardActions>
                        </Card>
                    </Grid2>
                ))}
            </Grid2>

            {/* Add Subscription Dialog */}
            <AddSubscriptionDialog
                open={isAddDialogOpen}
                onClose={() => setIsAddDialogOpen(false)}
                onAddSubscription={handleAddSubscription}
                catalog={catalog || []}
            />

            {/* Edit Subscription Dialog */}
            {selectedSubscription && (
                <EditSubscriptionDialog
                    open={isEditDialogOpen}
                    onClose={() => setIsEditDialogOpen(false)}
                    onUpdateSubscription={handleUpdateSubscription}
                    subscription={selectedSubscription}
                />
            )}

            {/* Confirmation Dialog */}
            <ConfirmDeleteDialog
                isConfirmOpen={isConfirmDialogOpen}
                setIsConfirmOpen={setIsConfirmDialogOpen}
                item={`Subscription of ${selectedSubscription?.tool.name}`}
                handleRemove={() => handleDeleteSubscription(selectedSubscription?.subscription_id)} />
        </Box>
    );
};

export default SubscriptionPage;
