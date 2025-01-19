import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Avatar,
    TextField,
    Box,
    Typography,
} from "@mui/material";

interface User {
    user_id: number;
    user_name: string;
}

interface Props {
    open: boolean;
    onClose: () => void;
    onAddUser: () => void;
    availableUsers: User[];
    selectedUserId: number | null;
    handleUserSelect: (teamId: number, userId: number) => void;
    teamId: number;
}
const AddUserDialog : React.FC<Props> = ({
    open,
    onClose,
    onAddUser,
    availableUsers,
    selectedUserId,
    handleUserSelect,
    teamId,
}) => {
    const [searchTerm, setSearchTerm] = useState("");

    // Filter users based on the search term
    const filteredUsers = availableUsers?.filter((user) =>
        user.user_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                <Typography variant="h6">Select a User to Add</Typography>
            </DialogTitle>
            <DialogContent>
                {/* Search bar */}
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

                {/* User list */}
                <List>
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                            <ListItem key={user.user_id} disablePadding>
                                <ListItemButton
                                    selected={selectedUserId === user.user_id}
                                    onClick={() => handleUserSelect(teamId, user.user_id)}
                                    sx={{
                                        "&.Mui-selected": {
                                            backgroundColor: "primary.light",
                                            color: "white",
                                        },
                                        "&.Mui-selected:hover": {
                                            backgroundColor: "primary.main",
                                        },
                                    }}
                                >
                                    <ListItemIcon>
                                        <Avatar>{user.user_name[0]}</Avatar>
                                    </ListItemIcon>
                                    <ListItemText primary={user.user_name} />
                                </ListItemButton>
                            </ListItem>
                        ))
                    ) : (
                        <Typography variant="body2" color="textSecondary" sx={{ padding: "1rem" }}>
                            No users found.
                        </Typography>
                    )}
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button
                    onClick={onAddUser}
                    color="primary"
                    variant="contained"
                    disabled={selectedUserId === null}
                >
                    Add User
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddUserDialog;
