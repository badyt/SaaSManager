import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Typography,
} from "@mui/material";
import { toast } from "react-toastify";

interface EditSubscriptionDialogProps {
    open: boolean;
    onClose: () => void;
    onUpdateSubscription: (updatedSubscription: { subscription_id: number; renewal_date: string; cost: number; license_count: number }) => void;
    subscriptionEntity: {
        subscription: Subscription;
        tool: CatalogTool;
    };
}

const EditSubscriptionDialog: React.FC<EditSubscriptionDialogProps> = ({ open, onClose, onUpdateSubscription, subscriptionEntity }) => {
    const { subscription, tool } = subscriptionEntity;
    const [licenseCount, setLicenseCount] = useState<number>(subscription.license_count);
    const [totalCost, setTotalCost] = useState<number>(subscription.cost);
    const [renewalDate, setRenewalDate] = useState<string>(subscription.renewal_date);
    const today = new Date().toISOString().split("T")[0];

    // Update total cost when license count changes
    useEffect(() => {
        setTotalCost(tool.default_cost * licenseCount);
    }, [licenseCount, tool.default_cost]);

    const handleLicenseChange = (newCount: number) => {
        setLicenseCount(newCount);
    };


    const handleUpdate = () => {
        if (licenseCount < subscription.license_count) {
            toast.error(`You cannot decrease licenses below ${subscription.license_count}`);
            return;
        }
        if (!renewalDate) {
            toast.error("Please select a renewal date.");
            return;
        }

        if (new Date(renewalDate) <= new Date(today)) {
            toast.error("Renewal date must be in the future.");
            return;
        }


        onUpdateSubscription({
            subscription_id: subscription.subscription_id,
            renewal_date: renewalDate,
            cost: totalCost,
            license_count: licenseCount,
        });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Edit Subscription</DialogTitle>
            <DialogContent>
                <Typography variant="h6" gutterBottom>
                    Tool: {tool.name}
                </Typography>

                <TextField
                    label="Number of Licenses"
                    type="number"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    value={licenseCount}
                    onChange={(e) => handleLicenseChange(Number(e.target.value))}
                />

                <TextField
                    label="Total Cost"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    value={totalCost.toFixed(2)}

                />

                <TextField
                    label="Renewal Date"
                    type="date"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    value={renewalDate}
                    onChange={(e) => setRenewalDate(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleUpdate} color="primary" variant="contained">
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditSubscriptionDialog;
