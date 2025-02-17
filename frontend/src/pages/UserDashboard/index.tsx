import React, { useState } from "react";
import { useUpdateUser, useUserTeams } from "../../hooks/useUsers";
import { Box, Typography, List, ListItem, Divider, Button } from "@mui/material";
import useAuthStore from "../../stores/authStore";
import { Roles } from "../../constants/roles";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useQueryClient } from "react-query";
import AssignAdminsDialog from "./AssignAdminsDialog";

const UserDashboard: React.FC = () => {
    const { username, role } = useAuthStore();
    const queryClient = useQueryClient();
    const { data: userTeams } = useUserTeams();
    const updateUser = useUpdateUser();
    const navigate = useNavigate();
    const [isAssignDialogOpen, setAssignDialogOpen] = useState(false);
    if (!username) return <Typography>Loading...</Typography>;
    const adminButtons = [{
        title: "Manage Teams",
        onClick: () => navigate("/teams"),
    },
    {
        title: "Assign Admins",
        onClick: () => setAssignDialogOpen(true),
    }]
     
    const handleAssignAdmin = (userId: number | null) => {
        if (!userId)
            return toast.error("please select user before.");
        updateUser.mutate({ id: userId, role: Roles.Admin }
            , {
                onSuccess: () => {
                    toast.success("successfully assigned as admin!");
                    queryClient.invalidateQueries(["users"]);
                    setAssignDialogOpen(false);
                },
                onError: (error) => { toast.error(`error occurred assigning user to admin: ${error}`) }
            });
    };



    return (
        <Box sx={{ padding: "2rem" }}>
            <Typography variant="h4" gutterBottom>
                Welcome, {username}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                Role: {role?.slice(5)}
            </Typography>

            <Divider sx={{ marginY: "1.5rem" }} />

            <Typography variant="h5">Your Teams</Typography>
            <List>
                {userTeams?.length > 0 ? (
                    userTeams.map((team: TeamDTO) => (
                        <ListItem key={team.id}>
                            <Typography>{team.name}</Typography>
                        </ListItem>
                    ))
                ) : (
                    <Typography>No teams found</Typography>
                )}
            </List>

            {role === Roles.Admin && (
                <>
                    <Divider sx={{ marginY: "1.5rem" }} />
                    <Typography variant="h5">Admin Options</Typography>
                    {adminButtons.map((item) => (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={item.onClick}
                            sx={{ marginTop: "1rem", marginRight: "1rem" }}
                        >
                            {item.title}
                        </Button>
                    ))}
                    <AssignAdminsDialog
                        open={isAssignDialogOpen}
                        onClose={() => setAssignDialogOpen(false)}
                        onAssignUser={(userId: number | null) => handleAssignAdmin(userId)}
                    />
                </>
            )}
        </Box>
    );
};

export default UserDashboard;
