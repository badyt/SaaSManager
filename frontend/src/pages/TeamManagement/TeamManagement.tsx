import React, { useState } from "react";
import {
    useCreateTeam,
    useAddUserToTeam,
    useRemoveUserFromTeam,
    useFetchAllTeamsWithUsers,
} from "../../hooks/useTeams";
import {
    Box,
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
} from "@mui/material";
import useAuthStore from "../../stores/authStore";
import { toast } from "react-toastify";
import TeamList from "./TeamList";
import { useQueryClient } from "react-query";

const TeamManagement: React.FC = () => {
    const { userId } = useAuthStore();
    const { data: teams } = useFetchAllTeamsWithUsers();
    const queryClient = useQueryClient();
    const createTeamMutation = useCreateTeam();
    const addUserMutation = useAddUserToTeam();
    const removeUserMutation = useRemoveUserFromTeam();

    const [open, setOpen] = useState(false);
    const [newTeamName, setNewTeamName] = useState("");
    const [newTeamDescription, setNewTeamDescription] = useState("");

    const handleCreateTeam = () => {
        if (!userId)
            return toast.error("error finding user id to create the team!");

        if (!newTeamName || !newTeamDescription)
            return toast.error("please fill both team name and team description!");
        createTeamMutation.mutate(
            { team_name: newTeamName, created_by: userId, description: newTeamDescription },
            {
                onSuccess: () => { toast.success("successfully created team!"); setOpen(false);
                    queryClient.invalidateQueries(["teamsWithUsers"]);
                 },
                onError: (error) => { toast.error(`error occurred creating team: ${error}`) }
            }
        );
    };

    const handleAddUser = (teamId: number, userId: number) => {
        addUserMutation.mutate({ teamId: teamId, userId: userId }
            , {
                onSuccess: () => {
                    toast.success("successfully added user to team!");
                    queryClient.invalidateQueries(["teamsWithUsers"]);
                },
                onError: (error) => { toast.error(`error occurred adding the user to team: ${error}`) }
            });

    };

    const handleRemoveUser = (teamId: number, userId: number) => {
        removeUserMutation.mutate({ teamId, userId },
            {
                onSuccess: () => {
                    toast.success("successfully removed user from team!");
                    queryClient.invalidateQueries(["teamsWithUsers"]);
                },
                onError: (error) => { toast.error(`error occurred removing the user from team: ${error}`) }
            }
        );
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
                        sx={{ marginTop: "0.5rem" }}
                    />
                    <TextField
                        label="Team Description"
                        fullWidth
                        value={newTeamDescription}
                        onChange={(e) => setNewTeamDescription(e.target.value)}
                        sx={{ marginTop: "1rem" }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleCreateTeam} disabled={createTeamMutation.isLoading}>
                        Create
                    </Button>
                </DialogActions>
            </Dialog>

            <TeamList teams={teams || []} onAddUser={handleAddUser} onRemoveUser={handleRemoveUser} />
        </Box>
    );
};

export default TeamManagement;
