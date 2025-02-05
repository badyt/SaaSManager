import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  TablePagination,
} from "@mui/material";
import { useFetchUsageLogs } from "../../hooks/useUsageLogs";
import { pageTitleStyles } from "../../styles/general";
import { useNavigate } from "react-router-dom";

const UsageLogsPage = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    userName: "",
    toolName: "",
    startDate: "",
    endDate: "",
    activityType: "",
  });
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const { data: usageLogs, isLoading, isError } = useFetchUsageLogs({
    userName: filters.userName || undefined,
    toolName: filters.toolName || undefined,
    startDate: filters.startDate ? new Date(filters.startDate).toISOString() : undefined,
    endDate: filters.endDate ? new Date(filters.endDate).toISOString() : undefined,
    activityType: filters.activityType || undefined,
  });



  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      userName: "",
      toolName: "",
      startDate: "",
      endDate: "",
      activityType: "",
    });
  };

  const paginatedLogs = usageLogs?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={pageTitleStyles}>
        Usage Logs
      </Typography>

      {/* Filters Section */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          mb: 3,
          alignItems: "center",
        }}
      >
        <TextField
          label="User Name"
          name="userName"
          variant="outlined"
          value={filters.userName}
          onChange={handleFilterChange}
          sx={{ width: { xs: "100%", sm: "200px" } }}
        />
        <TextField
          label="Tool Name"
          name="toolName"
          variant="outlined"
          value={filters.toolName}
          onChange={handleFilterChange}
          sx={{ width: { xs: "100%", sm: "200px" } }}
        />
        <TextField
          label="Start Date"
          name="startDate"
          type="date"
          variant="outlined"
          value={filters.startDate}
          onChange={handleFilterChange}
          sx={{ width: { xs: "100%", sm: "200px" } }}
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <TextField
          label="End Date"
          name="endDate"
          type="date"
          variant="outlined"
          value={filters.endDate}
          onChange={handleFilterChange}
          sx={{ width: { xs: "100%", sm: "200px" } }}
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <TextField
          label="Activity Type"
          name="activityType"
          variant="outlined"
          value={filters.activityType}
          onChange={handleFilterChange}
          sx={{ width: { xs: "100%", sm: "200px" } }}
        />
        <Button variant="contained" color="primary" onClick={handleClearFilters}>
          Clear Filters
        </Button>
      </Box>

      {/* Logs Table */}
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : isError ? (
        <Typography color="error" align="center">
          Error fetching usage logs!
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{fontWeight: "bold"}}>User Name</TableCell>
                <TableCell sx={{fontWeight: "bold"}}>Tool Name</TableCell>
                <TableCell sx={{fontWeight: "bold"}}>Activity Type</TableCell>
                <TableCell sx={{fontWeight: "bold"}}>Activity Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedLogs?.length > 0 ? (
                paginatedLogs.map((log: UsageLog) => (
                  <TableRow key={log.logId}>
                    <TableCell>{log.userName}</TableCell>
                    <TableCell>{log.toolName}</TableCell>
                    <TableCell>{log.activityType}</TableCell>
                    <TableCell>{new Date(log.activityDate).toLocaleString()}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No logs found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

      )}
      <TablePagination
        // rowsPerPageOptions={[15, 30, 50]}
        component="div"
        count={usageLogs?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        // labelRowsPerPage="Logs per page"
        showFirstButton
        showLastButton
        sx={{
          "& .MuiTablePagination-toolbar .MuiTablePagination-selectLabel": { display: "none" }, // Hide "Rows per page" label
          "& .MuiTablePagination-toolbar .MuiInputBase-root": { display: "none" }, // Hide the dropdown select
        }}
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button variant="contained" color="secondary" onClick={() => navigate("/underutilized")}>
          View Underutilized Licenses
        </Button>
      </Box>
    </Box>
  );
};

export default UsageLogsPage;
