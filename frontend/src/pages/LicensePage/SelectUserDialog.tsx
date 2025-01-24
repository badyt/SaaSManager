import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemButton, ListItemText, TextField } from "@mui/material";
import React, { useState } from "react";

interface Props {
    isUserDialogOpen: boolean;
    users: UserDTO[];
    setIsUserDialogOpen: (value: boolean) => void;
    setSelectedUser: (user: UserDTO) => void;
}
const SelectUserDialog: React.FC<Props> = ({ isUserDialogOpen, users, setIsUserDialogOpen, setSelectedUser }) => {
    const [searchTerm, setSearchTerm] = useState("");

    // Filter users based on the search term
    const filteredUsers = users?.filter((user) =>
        user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <Dialog open={isUserDialogOpen} onClose={() => setIsUserDialogOpen(false)} maxWidth="sm" fullWidth>
            <DialogTitle>Select a User</DialogTitle>
            <DialogContent>
                <Box sx={{ marginBottom: "1rem" }}>
                    <TextField
                        fullWidth
                        placeholder="Search by user name..."
                        variant="outlined"
                        size="small"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Box>
                <List>
                    {filteredUsers?.map((user: UserDTO) => (
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
    )
}

export default SelectUserDialog;