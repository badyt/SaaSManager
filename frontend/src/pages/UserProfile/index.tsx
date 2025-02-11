import React, { useState } from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Paper,
    Divider,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit'; // Import edit icon
import useAuthStore from "../../stores/authStore";
import { useUpdatePassword, useUpdateUser } from "../../hooks/useUsers";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";

const UserProfile = () => {
    const { mutate: updateUser } = useUpdateUser();
    const { mutate: updateUserPassword } = useUpdatePassword();
    const [isEditUsernameOpen, setEditUsernameOpen] = useState(false);
    const [isChangePasswordOpen, setChangePasswordOpen] = useState(false);
    const { userId, username, email, role, status, setUsername } = useAuthStore();
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [usernameInput, setUsernameInput] = useState(username);

    const closePasswordDialog = () => {
        setOldPassword("");
        setNewPassword("");
        setConfirmedPassword("");
        setChangePasswordOpen(false);
    }

    const handleEditName = async () => {
        updateUser({ id: userId, name: usernameInput }, {
            onSuccess: (data) => {
                toast.success("Updated Name successfully!");
                setUsername(data.name);
            },
            onError: (error) => {
                if (isAxiosError(error)) {
                    const errorMessage = error.response?.data || "An error occurred";
                    toast.error(errorMessage);
                } else {
                    toast.error("An unexpected error occurred");
                }
            },
        });
        setEditUsernameOpen(false);
    }

    const handleChangePassword = async () => {
        if (!oldPassword || !newPassword || !confirmedPassword) {
            return toast.error("please fill in all fields!")
        }
        if (newPassword !== confirmedPassword) {
            return toast.error("New and Confirmed Password Mismatch!")
        }
        if (!userId)
            return toast.error("error finding the user id");
        updateUserPassword({ id: userId, oldPassword: oldPassword, newPassword: newPassword }, {
            onSuccess: (data) => {
                toast.success("Updated Password successfully!");
            },
            onError: (error) => {
                if (isAxiosError(error)) {
                    const errorMessage = error.response?.data || "An error occurred";
                    toast.error(errorMessage);
                } else {
                    toast.error("An unexpected error occurred");
                }
            },
        });
        closePasswordDialog();
    }


    return (
        <Box sx={{ display: "flex", flexDirection: "column", p: 4 }}>

            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
                User Profile
            </Typography>
            <Divider sx={{ mb: 3 }} />

            {/* Profile Details */}
            <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>Username:</Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography>{username}</Typography>
                    <IconButton size="small" onClick={() => setEditUsernameOpen(true)} aria-label="Edit username">
                        <EditIcon fontSize="small" />
                    </IconButton>
                </Box>
            </Box>

            <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>Email:</Typography>
                <Typography color="text.secondary">{email}</Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>Role:</Typography>
                <Typography color="text.secondary">{role?.slice(5)}</Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>Status:</Typography>
                <Typography color="text.secondary">{status}</Typography>
            </Box>

            {/* Change Password Button */}
            <Button
                variant="contained"
                sx={{ borderRadius: 2, fontWeight: "bold", width: "15rem" }}
                onClick={() => setChangePasswordOpen(true)}
            >
                Change Password
            </Button>


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
                        value={usernameInput}
                        onChange={(e) => setUsernameInput(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditUsernameOpen(false)}>Cancel</Button>
                    <Button onClick={handleEditName} variant="contained">Save</Button>
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
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="New Password"
                        type="password"
                        fullWidth
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Confirm New Password"
                        type="password"
                        fullWidth
                        value={confirmedPassword}
                        onChange={(e) => setConfirmedPassword(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closePasswordDialog}>Cancel</Button>
                    <Button onClick={handleChangePassword} variant="contained">Save</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default UserProfile;
