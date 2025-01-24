import React, { useState } from "react";
import {
    Box,
    Typography,
    List,
    ListItem,
    Button,
    Divider,
    Avatar,
} from "@mui/material";
import { toast } from "react-toastify";
import AddUserDialog from "./AddUserDialog";

interface User {
    user_id: number;
    user_name: string;
}

interface Team {
    id: number;
    name: string;
    description: string;
    created_by: number;
}
interface TeamEntry {
    team: Team;
    users: User[];
}

interface TeamListProps {
    teams: TeamEntry[];
    onAddUser: (teamId: number, userId: number) => void;
    onRemoveUser: (teamId: number, userId: number) => void;
    availableUsers: User[]; // List of all available users
}

const TeamList: React.FC<TeamListProps> = ({ teams, onAddUser, onRemoveUser, availableUsers }) => {
    const [openDialog, setOpenDialog] = useState<{ [key: number]: boolean }>({});
    const [selectedUser, setSelectedUser] = useState<{ [key: number]: number | null }>({});

    const handleDialogOpen = (teamId: number) => {
        setOpenDialog({ [teamId]: true });
    };

    const handleDialogClose = (teamId: number) => {
        setOpenDialog({ [teamId]: false });
        setSelectedUser({ [teamId]: null });
    };

    const handleUserSelect = (teamId: number, userId: number) => {
        setSelectedUser({ [teamId]: userId });
    };

    const handleAddUser = (teamId: number) => {
        const userId = selectedUser[teamId];
        if (userId !== null) {
            onAddUser(teamId, userId);
            handleDialogClose(teamId);
        } else {
            toast.error("Please select a user to add.");
        }
    };

    return (
        <Box>
            {teams.map((teamEntry) => (
                <Box
                    key={teamEntry.team.id}
                    sx={{
                        marginBottom: "2rem",
                        padding: "1.5rem",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            marginBottom: "1rem",
                        }}
                    >
                        <Typography variant="h6">{teamEntry.team.name}</Typography>
                        <Typography variant="subtitle2" sx={{ color: "gray" }}>
                            {teamEntry.team.description}
                        </Typography>
                    </Box>
                    <Divider />
                    <Box sx={{ marginTop: "1rem" }}>
                        <Typography variant="subtitle1" gutterBottom>
                            Users in Team:
                        </Typography>
                        <List>
                            {teamEntry.users.map((user) => (
                                <ListItem
                                    key={user.user_id}
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        padding: "0.5rem 0",
                                    }}
                                >
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <Avatar sx={{ marginRight: "1rem" }}>{user.user_name[0]}</Avatar>
                                        <Typography>{user.user_name}</Typography>
                                    </Box>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() => onRemoveUser(teamEntry.team.id, user.user_id)}
                                    >
                                        Remove
                                    </Button>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                    <Divider sx={{ margin: "1rem 0" }} />
                    <Box>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleDialogOpen(teamEntry.team.id)}
                        >
                            Add User
                        </Button>
                    </Box>
                    <AddUserDialog
                        open={!!openDialog[teamEntry.team.id]}
                        onClose={() => handleDialogClose(teamEntry.team.id)}
                        onAddUser={() => handleAddUser(teamEntry.team.id)}
                        availableUsers={availableUsers}
                        selectedUserId={selectedUser[teamEntry.team.id] || null}
                        handleUserSelect={handleUserSelect}
                        teamId={teamEntry.team.id}
                    />
                </Box>
            ))}
        </Box>
    );
};

export default TeamList;
