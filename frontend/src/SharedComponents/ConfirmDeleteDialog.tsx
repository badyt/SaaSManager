import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React from "react";

interface Props {
    isConfirmOpen: boolean;
    setIsConfirmOpen: (valiue: boolean) => void;
    item: string;
    handleRemove: () => void;
}
const ConfirmDeleteDialog: React.FC<Props> = ({ isConfirmOpen, setIsConfirmOpen, item, handleRemove }) => {
    return (
        <Dialog
            open={isConfirmOpen}
            onClose={() => setIsConfirmOpen(false)}
            maxWidth="xs"
            fullWidth
        >
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete <strong>{item}</strong>? This action
                    cannot be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setIsConfirmOpen(false)} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleRemove} color="error" variant="contained">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDeleteDialog;