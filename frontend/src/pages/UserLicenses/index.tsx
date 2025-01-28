import React, { useState } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    TextField,
    Button,
    CardActions,
    Grid2,
} from "@mui/material";
import { toast } from "react-toastify";
import { useQueryClient } from "react-query";
import { useFetchLicensesByUser } from "../../hooks/useLicense";
import useAuthStore from "../../stores/authStore";
import { useLogUserInteraction } from "../../hooks/useUsageLogs";
import LicenseInteractionDialog from "./LicenseInteractionDialog";
import { AxiosError } from "axios";

const UserLicenses: React.FC = () => {
    const { userId } = useAuthStore();
    const [selectedLicense, setSelectedLicense] = useState<License | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const queryClient = useQueryClient();
    const { data: userLicenses, isLoading, isError } = useFetchLicensesByUser(userId);
    const logUserInteractionMutation = useLogUserInteraction();
    if (isLoading) return <Typography>Loading licenses...</Typography>;
    if (isError) return <Typography>Error loading licenses.</Typography>;
    if (!userLicenses) return <Typography>No licenses available.</Typography>;

    const filterLicenses = userLicenses?.filter(
        (license: License) =>
            license.tool_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleInteract = (licenseId: number, activityType: string) => {
        logUserInteractionMutation.mutate(
            {
                licenseId,
                activityType
            },
            {
                onSuccess: () => {
                    toast.success("Interaction logged successfully!");
                    queryClient.invalidateQueries(["usageLogs"]);
                },
                onError: (error) => {
                    const errorMessage = (error instanceof AxiosError) ? error.response?.data : error;
                    toast.error(`Error allocating license: ${errorMessage}`);
                },
            }
        );
    };


    return (
        <Box sx={{ padding: "2rem" }}>
            <Typography variant="h4" gutterBottom>
                My Licenses
            </Typography>

            <Box sx={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}>
                <TextField
                    label="Search Licenses"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </Box>

            <Grid2
                container
                spacing={2}
                sx={{ display: "flex", flexWrap: "wrap" }}
            >
                {filterLicenses?.map((license: License) => (
                    <Grid2
                        key={license.license_id}
                        sx={{
                            width: {
                                xs: "100%", // Full width on extra-small screens
                                sm: "50%",  // Half width on small screens
                                md: "33.33%", // One-third width on medium screens
                                lg: "25%",  // One-fourth width on large screens
                            },
                            padding: "8px",
                        }}
                    >
                        <Card
                            sx={{
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                            }}
                        >
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {license.tool_name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Allocated at {new Date(license.allocated_at).toUTCString()}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    size="small"
                                    variant="contained"
                                    onClick={() => setSelectedLicense(license)}
                                >
                                    Interact
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid2>
                ))}
            </Grid2>
            <LicenseInteractionDialog
                open={!!selectedLicense}
                onClose={() => setSelectedLicense(null)}
                license={selectedLicense}
                onInteract={handleInteract}
            />
        </Box>
    );
};

export default UserLicenses;
