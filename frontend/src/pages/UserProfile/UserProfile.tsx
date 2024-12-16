import React, { useState } from "react";
import {
    Box,
    Avatar,
    Typography,
    TextField,
    Button,
    Grid,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import useAuthStore from "../../stores/authStore";

const UserProfile = () => {
    const [isEditUsernameOpen, setEditUsernameOpen] = useState(false);
    const [isChangePasswordOpen, setChangePasswordOpen] = useState(false);
    const { username, email, role } = useAuthStore();
    const [usernameInput, setUsernameInput] = useState(username);

    const handleEditUsername = (newUsername: string) => {
        setUsernameInput(newUsername);
        setEditUsernameOpen(false);
    };

    const handleSaveUsername = (newUsername: string | null) => {
        console.log("to be implemented");

    }

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: 4,
                // backgroundColor: "#f9f9f9",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    maxWidth: 600,
                    padding: 3,
                    borderRadius: 2,
                    boxShadow: 3,
                    // backgroundColor: "#fff",
                    textAlign: "center",
                }}
            >
                {/* Avatar Section */}

                <Typography variant="h5" sx={{ marginTop: 2 }}>
                    {username}
                </Typography>

                {/* Action Buttons */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 2, // Space between buttons
                        flexWrap: "wrap",
                    }}
                >
                    <Button variant="contained" onClick={() => setEditUsernameOpen(true)}>
                        Edit Username
                    </Button>
                    <Button variant="outlined" onClick={() => setChangePasswordOpen(true)}>
                        Change Password
                    </Button>
                </Box>
            </Box>


            {/* Edit Username Dialog */}
            <Dialog open={isEditUsernameOpen} onClose={() => setEditUsernameOpen(false)}>
                <DialogTitle>Edit Username</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="New Username"
                        type="text"
                        fullWidth
                        defaultValue={username}
                        onBlur={(e) => handleEditUsername(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditUsernameOpen(false)}>Cancel</Button>
                    <Button onClick={() => handleSaveUsername(usernameInput)}>Save</Button>
                </DialogActions>
            </Dialog>

            {/* Change Password Dialog */}
            <Dialog open={isChangePasswordOpen} onClose={() => setChangePasswordOpen(false)}>
                <DialogTitle>Change Password</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Old Password"
                        type="password"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="New Password"
                        type="password"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Confirm New Password"
                        type="password"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setChangePasswordOpen(false)}>Cancel</Button>
                    <Button onClick={() => setChangePasswordOpen(false)}>Save</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default UserProfile;
