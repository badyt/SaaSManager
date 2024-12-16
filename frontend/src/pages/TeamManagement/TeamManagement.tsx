import React, { useState } from "react";
import {
    useFetchAllTeams,
    useCreateTeam,
    useAddUserToTeam,
    useRemoveUserFromTeam,
} from "../../hooks/useTeams";
import {
    Box,
    Typography,
    List,
    ListItem,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
} from "@mui/material";

const TeamManagement: React.FC = () => {
    const { data: teams } = useFetchAllTeams();
    const createTeamMutation = useCreateTeam();
    const addUserMutation = useAddUserToTeam();
    const removeUserMutation = useRemoveUserFromTeam();

    const [open, setOpen] = useState(false);
    const [newTeamName, setNewTeamName] = useState("");
    const [newTeamDescription, setNewTeamDescription] = useState("");
    const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);
    const [userIdToAdd, setUserIdToAdd] = useState("");

    const handleCreateTeam = () => {
        createTeamMutation.mutate(
            { teamName: newTeamName },
            {
                onSuccess: () => setOpen(false),
            }
        );
    };

    const handleAddUser = () => {
        if (selectedTeamId) {
            addUserMutation.mutate({ teamId: selectedTeamId, userId: parseInt(userIdToAdd) });
        }
    };

    const handleRemoveUser = (teamId: number, userId: number) => {
        removeUserMutation.mutate({ teamId, userId });
    };

    return (
        <Box sx={{ padding: "2rem" }}>
            <Typography variant="h4" gutterBottom>
                Team Management
            </Typography>

            <Button
                variant="contained"
                color="primary"
                onClick={() => setOpen(true)}
                sx={{ marginBottom: "1.5rem" }}
            >
                Create New Team
            </Button>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Create New Team</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Team Name"
                        fullWidth
                        value={newTeamName}
                        onChange={(e) => setNewTeamName(e.target.value)}
                    />
                    <TextField
                        label="Team Description"
                        fullWidth
                        value={newTeamDescription}
                        onChange={(e) => setNewTeamDescription(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleCreateTeam} disabled={createTeamMutation.isLoading}>
                        Create
                    </Button>
                </DialogActions>
            </Dialog>

            <List>
                {teams?.map((team: { teamId: number; teamName: string }) => (
                    <ListItem key={team.teamId} sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography>{team.teamName}</Typography>
                        <Box>
                            <TextField
                                size="small"
                                label="User ID"
                                value={selectedTeamId === team.teamId ? userIdToAdd : ""}
                                onChange={(e) => setUserIdToAdd(e.target.value)}
                                onFocus={() => setSelectedTeamId(team.teamId)}
                                sx={{ marginRight: "0.5rem" }}
                            />
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={handleAddUser}
                                disabled={addUserMutation.isLoading}
                            >
                                Add User
                            </Button>
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={() => handleRemoveUser(team.teamId, parseInt(userIdToAdd))}
                                sx={{ marginLeft: "0.5rem" }}
                                disabled={removeUserMutation.isLoading}
                            >
                                Remove User
                            </Button>
                        </Box>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default TeamManagement;
