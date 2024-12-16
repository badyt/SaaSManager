import React from "react";
import { useUserTeams } from "../../hooks/useUsers";
import { Box, Typography, List, ListItem, Divider, Button } from "@mui/material";
import useAuthStore from "../../stores/authStore";
import { Roles } from "../../constants/roles";

const UserDashboard: React.FC = () => {
    const { username, role } = useAuthStore()
    const { data: userTeams } = useUserTeams();

    if (!username) return <Typography>Loading...</Typography>;

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
                    userTeams.map((team: { teamId: number; teamName: string }) => (
                        <ListItem key={team.teamId}>
                            <Typography>{team.teamName}</Typography>
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
                    <Button
                        variant="contained"
                        color="primary"
                        href="/team-management"
                        sx={{ marginTop: "1rem" }}
                    >
                        Manage Teams
                    </Button>
                </>
            )}
        </Box>
    );
};

export default UserDashboard;
