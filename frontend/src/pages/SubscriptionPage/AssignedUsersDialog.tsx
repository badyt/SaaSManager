import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Button,
    Box,
    Divider,
    Typography
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import ConfirmDeleteDialog from "../../SharedComponents/ConfirmDeleteDialog";


interface AssignedUsersDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onRemoveUser: (licenseId?: number) => void;
    licenses: License[] | null;
    subscription: Subscription | null;
}

const AssignedUsersDialog: React.FC<AssignedUsersDialogProps> = ({
    isOpen,
    onClose,
    onRemoveUser,
    licenses,
    subscription
}) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [isConfirmUserDeleteOpen, setIsConfirmUserDeleteOpen] = useState(false);
    const [selectedLicenseToDelete, setSelectedLicenseToDelete] = useState<License | null>(null);

    const filteredLicenses = licenses?.filter((license) =>
        license?.user_name?.toLowerCase().includes(searchQuery.toLowerCase())
    );


    return (
        <>
            <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
                <DialogTitle>
                    Assigned Users for {subscription?.tool.name}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ marginBottom: "1rem" , marginTop: "0.3rem"}}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            label="Search Users"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </Box>
                    <Divider />

                    <List>
                        {filteredLicenses?.map((license) => (
                            <ListItem
                                key={license.license_id}
                                secondaryAction={
                                    <IconButton
                                        edge="end"
                                        color="error"
                                        onClick={() =>{ setSelectedLicenseToDelete(license); setIsConfirmUserDeleteOpen(true)}}
                                    >
                                        <Delete />
                                    </IconButton>
                                }
                            >
                                <ListItemText primary={license.user_name} />
                            </ListItem>
                        ))}
                    </List>

                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="secondary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
            {/* Confirmation Dialog for user in subscription*/}
            <ConfirmDeleteDialog
                isConfirmOpen={isConfirmUserDeleteOpen}
                setIsConfirmOpen={setIsConfirmUserDeleteOpen}
                item={`${selectedLicenseToDelete?.user_name}`}
                handleRemove={() => {
                    onRemoveUser(selectedLicenseToDelete?.license_id)
                    setSelectedLicenseToDelete(null);
                    setIsConfirmUserDeleteOpen(false);
                }
                } />
        </>
    );
};

export default AssignedUsersDialog;
