import React, { useState } from "react";
import {
    Box,
    Typography,
    List,
    ListItem,
    TextField,
    Button,
    Divider,
    Avatar,
} from "@mui/material";
import { toast } from "react-toastify";

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
}

const TeamList: React.FC<TeamListProps> = ({ teams, onAddUser, onRemoveUser }) => {
    console.log(teams);
    const [selectedUserId, setSelectedUserId] = useState<{ [key: number]: string }>({});
    const handleUserIdChange = (teamId: number, value: string) => {
        setSelectedUserId((prev) => ({ ...prev, [teamId]: value }));
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
                    <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <TextField
                            label="User ID"
                            size="small"
                            value={selectedUserId[teamEntry.team.id] || ""}
                            onChange={(e) => handleUserIdChange(teamEntry.team.id, e.target.value)}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                const userId = parseInt(selectedUserId[teamEntry.team.id], 10);
                                if (!isNaN(userId)) {
                                    onAddUser(teamEntry.team.id, userId);
                                    setSelectedUserId((prev) => ({ ...prev, [teamEntry.team.id]: "" }));
                                } else {
                                    toast.error("Please enter a valid user ID.");
                                }
                            }}
                        >
                            Add User
                        </Button>
                    </Box>
                </Box>
            ))}
        </Box>
    );
};

export default TeamList;
