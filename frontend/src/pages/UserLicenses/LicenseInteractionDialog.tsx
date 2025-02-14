import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
} from "@mui/material";
import { toast } from "react-toastify";

interface LicenseInteractionDialogProps {
    open: boolean;
    onClose: () => void;
    license: License | null;
    onInteract: (licenseId: number, activityType: string) => void;
}

const LicenseInteractionDialog: React.FC<LicenseInteractionDialogProps> = ({ open, onClose, license, onInteract }) => {
    const [activityType, setActivityType] = useState("");
    if (!license) return null;

    const handleInteract = () => {
        if (!activityType)
            return toast.error('please type activity type before sending interaction!');
        onInteract(license.license_id, activityType);
        onClose(); // Close the details dialog
    };

    return (
        <>
            <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
                <DialogTitle>{license.tool_name}</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        placeholder="Activity Type..."
                        variant="outlined"
                        size="small"
                        value={activityType}
                        onChange={(e) => setActivityType(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="secondary">
                        Close
                    </Button>
                    <Button
                        onClick={handleInteract}
                        color="success"
                        variant="contained"
                    >
                        Send Interaction
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default LicenseInteractionDialog;