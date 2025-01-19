import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
} from "@mui/material";
import { toast } from "react-toastify";

interface AddSubscriptionDialogProps {
    open: boolean;
    onClose: () => void;
    onAddSubscription: (subscription: { tool_id: number; renewal_date: string; cost: number; license_count: number }) => void;
    catalog: CatalogTool[];
}

const AddSubscriptionDialog: React.FC<AddSubscriptionDialogProps> = ({ open, onClose, onAddSubscription, catalog }) => {
    const [selectedToolId, setSelectedToolId] = useState<number | "">("");
    const [licenseCount, setLicenseCount] = useState<number | "">("");
    const [totalCost, setTotalCost] = useState<number>(0);
    const [renewalDate, setRenewalDate] = useState<string>("");
    const today = new Date().toISOString().split("T")[0];

    // Calculate total cost when selectedToolId or licenseCount changes
    useEffect(() => {
        if (selectedToolId && licenseCount) {
            const selectedTool = catalog.find(tool => tool.tool_id === selectedToolId);
            if (selectedTool) {
                setTotalCost(selectedTool.default_cost * Number(licenseCount));
            }
        } else {
            setTotalCost(0);
        }
    }, [selectedToolId, licenseCount, catalog]);

    const handleAdd = () => {
        if (!selectedToolId || !licenseCount || !renewalDate) {
            alert("Please fill all fields");
            return;
        }

        if (new Date(renewalDate) <= new Date(today)) {
            toast.error("Renewal date must be in the future.");
            return;
        }

        onAddSubscription({
            tool_id: selectedToolId,
            renewal_date: renewalDate,
            cost: totalCost,
            license_count: Number(licenseCount),
        });

        // Reset form fields after adding
        setSelectedToolId("");
        setLicenseCount("");
        setTotalCost(0);
        setRenewalDate("");
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Add New Subscription</DialogTitle>
            <DialogContent>
                <FormControl fullWidth margin="normal">
                    <InputLabel>Select a SaaS Tool</InputLabel>
                    <Select
                        value={selectedToolId}
                        onChange={(e) => setSelectedToolId(Number(e.target.value))}
                    >
                        {catalog.map((tool) => (
                            <MenuItem key={tool.tool_id} value={tool.tool_id}>
                                {tool.name} - ${tool.default_cost.toFixed(2)}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    label="Number of Licenses"
                    type="number"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    value={licenseCount}
                    onChange={(e) => setLicenseCount(Number(e.target.value))}
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
                <Button onClick={onClose} color="secondary">Cancel</Button>
                <Button onClick={handleAdd} color="primary" variant="contained">Add</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddSubscriptionDialog;
