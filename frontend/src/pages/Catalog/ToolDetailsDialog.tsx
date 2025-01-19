import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Button,
} from "@mui/material";
import ConfirmDeleteDialog from "../../SharedComponents/ConfirmDeleteDialog";

interface ToolDetailsDialogProps {
    open: boolean;
    onClose: () => void;
    tool: {
        tool_id: number;
        name: string;
        description: string;
        default_cost: number;
        created_at: string;
    } | null;
    onRemoveTool: (toolId: number) => void;
}

const ToolDetailsDialog: React.FC<ToolDetailsDialogProps> = ({ open, onClose, tool, onRemoveTool }) => {

    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    if (!tool) return null;

    const handleRemove = () => {
        onRemoveTool(tool.tool_id);
        setIsConfirmOpen(false); // Close the confirmation dialog
        onClose(); // Close the details dialog
    };

    return (
        <>
            <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
                <DialogTitle>{tool.name}</DialogTitle>
                <DialogContent>
                    <Typography variant="body1" gutterBottom>
                        <strong>Description:</strong> {tool.description}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        <strong>Default Cost:</strong> ${tool.default_cost.toFixed(2)}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        <strong>Created At:</strong> {new Date(tool.created_at).toLocaleString()}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="secondary">
                        Close
                    </Button>
                    <Button
                        onClick={() => setIsConfirmOpen(true)}
                        color="error"
                        variant="contained"
                    >
                        Remove Tool
                    </Button>
                </DialogActions>
            </Dialog>
            <ConfirmDeleteDialog
                isConfirmOpen={isConfirmOpen}
                setIsConfirmOpen={setIsConfirmOpen}
                item={tool.name}
                handleRemove={handleRemove} />
        </>
    );
};

export default ToolDetailsDialog;
