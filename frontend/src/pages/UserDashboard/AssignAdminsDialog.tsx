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
import { useUsers } from "../../hooks/useUsers";

interface Props {
    open: boolean;
    onClose: () => void;
    onAssignUser: (userId: number | null) => void;
}
const AssignAdminsDialog: React.FC<Props> = ({
    open,
    onClose,
    onAssignUser,
}) => {
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const { data: users } = useUsers();
    const [searchTerm, setSearchTerm] = useState("");
    // Filter users based on the search term
    const filteredUsers = users?.filter((user: UserDTO) =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                <Typography variant="h6">Select a User to Assign</Typography>
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
                <Box sx={{ maxHeight: "20rem", overflowY: "auto" }}>
                    <List>
                        {filteredUsers?.length > 0 ? (
                            filteredUsers.map((user: UserDTO) => (
                                <ListItem key={user.userId} disablePadding>
                                    <ListItemButton
                                        selected={selectedUserId === user.userId}
                                        onClick={() => setSelectedUserId(user.userId)}
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
                                            <Avatar>{user.name?.slice(0, 1)}</Avatar>
                                        </ListItemIcon>
                                        <ListItemText primary={user.name} />
                                    </ListItemButton>
                                </ListItem>
                            ))
                        ) : (
                            <Typography variant="body2" color="textSecondary" sx={{ padding: "1rem" }}>
                                No users found.
                            </Typography>
                        )}
                    </List>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button
                    onClick={() => onAssignUser(selectedUserId)}
                    color="primary"
                    variant="contained"
                    disabled={selectedUserId === null}
                >
                    Assign as Admin
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AssignAdminsDialog;
