import React, { useState } from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    CircularProgress,
    TableContainer,
    Table,
    TableRow,
    Paper,
    TableHead,
    TableCell,
    TableBody,
    TablePagination,
    IconButton,
} from "@mui/material";

interface UnderutilizedLicense {
    licenseId: number;
    userName: string;
    toolName: string;
    activityCount: number;
    allocated_at: string;
}

import { useFetchUnderutilizedLicenses } from "../../hooks/useUsageLogs";
import { pageTitleStyles } from "../../styles/general";
import { Delete } from "@mui/icons-material";
import { useRemoveLicense } from "../../hooks/useLicense";
import { toast } from "react-toastify";
import { useQueryClient } from "react-query";
import ConfirmDeleteDialog from "../../SharedComponents/ConfirmDeleteDialog";
import { useNavigate } from "react-router-dom";

const UnderutilizedPage = () => {
    const [filters, setFilters] = useState({ threshold: 5, period: "30d" });
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const rowsPerPage = 10;
    const [selectedLicense, setSelectedLicense] = useState<UnderutilizedLicense | null>(null);
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    const RemoveLicenseMutation = useRemoveLicense();
    const queryClient = useQueryClient();

    const { data: underutilizedLicenses, isLoading, isError } =
        useFetchUnderutilizedLicenses(filters);

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: name === "threshold" ? Number(value) : value,
        }));
    };
    console.log(underutilizedLicenses);
    

    const handleRemoveLicense = (license_id?: number) => {
        if (!license_id)
            return toast.error("license id to remove is missing!");
        RemoveLicenseMutation.mutate(license_id
            , {
                onSuccess: async () => {
                    toast.success("successfully deleted license!");
                    setIsConfirmDialogOpen(false);
                    setSelectedLicense(null);
                    queryClient.invalidateQueries(["subscriptions"]);
                    queryClient.invalidateQueries(["licenses"]);
                    queryClient.invalidateQueries(["underutilizedLicenses"]);
                },
                onError: (error) => {
                    toast.error(`error occurred deleting license: ${error}`);
                    setIsConfirmDialogOpen(false);
                    setSelectedLicense(null);
                }
            });

    }

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" sx={pageTitleStyles}>
                Underutilized Subscriptions
            </Typography>

            {/* Filter Section */}
            <Box
                sx={{
                    display: "flex",
                    gap: 2,
                    mb: 3,
                    flexWrap: "wrap",
                }}
            >
                <TextField
                    label="Threshold"
                    name="threshold"
                    type="number"
                    value={filters.threshold}
                    onChange={handleFilterChange}
                    variant="outlined"
                    sx={{ width: { xs: "100%", sm: "200px" } }}
                />
                <TextField
                    label="Period"
                    name="period"
                    value={filters.period}
                    onChange={handleFilterChange}
                    variant="outlined"
                    sx={{ width: { xs: "100%", sm: "200px" } }}
                />
                <Button variant="contained" color="primary" onClick={() => { queryClient.refetchQueries(["underutilizedLicenses"]); }}>
                    Apply Filters
                </Button>
            </Box>

            {/* Subscriptions List */}
            {isLoading ? (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                    <CircularProgress />
                </Box>
            ) : isError ? (
                <Typography color="error" align="center">
                    Error fetching underutilized licenses!
                </Typography>
            ) :
                (
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: "bold" }}>License Id</TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }}>User Name</TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }}>Tool Name</TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }}>Activity Count</TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }}>Allocated At</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {underutilizedLicenses?.length > 0 ? (
                                    underutilizedLicenses.map((license: UnderutilizedLicense) => (
                                        <TableRow key={license.licenseId}>
                                            <TableCell>{license.licenseId}</TableCell>
                                            <TableCell>{license.userName}</TableCell>
                                            <TableCell>{license.toolName}</TableCell>
                                            <TableCell>{license.activityCount}</TableCell>
                                            <TableCell>{(new Date(license.allocated_at)).toUTCString()}</TableCell>
                                            <TableCell><IconButton
                                                color="error"
                                                onClick={() => {
                                                    setSelectedLicense(license);
                                                    setIsConfirmDialogOpen(true);
                                                }}
                                            >
                                                <Delete />
                                            </IconButton></TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} align="center">
                                            No Underutilized licenses found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                )}
            <TablePagination
                component="div"
                count={underutilizedLicenses?.length || 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(_, newPage) => setPage(newPage)}
                showFirstButton
                showLastButton
                sx={{
                    "& .MuiTablePagination-toolbar .MuiTablePagination-selectLabel": { display: "none" }, // Hide "Rows per page" label
                    "& .MuiTablePagination-toolbar .MuiInputBase-root": { display: "none" }, // Hide the dropdown select
                }}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <Button variant="contained" color="secondary" onClick={() => navigate("/usagelogs")}>
                    Back
                </Button>
            </Box>
            <ConfirmDeleteDialog
                isConfirmOpen={isConfirmDialogOpen}
                setIsConfirmOpen={setIsConfirmDialogOpen}
                item={`License ${selectedLicense?.licenseId} for ${selectedLicense?.userName}`}
                handleRemove={() => handleRemoveLicense(selectedLicense?.licenseId)} />
        </Box>
    );
};

export default UnderutilizedPage;
