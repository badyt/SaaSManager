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
} from "@mui/material";
import { useFetchUsageLogs } from "../../hooks/useUsageLogs";

const UsageLogsPage = () => {
  const [filters, setFilters] = useState({
    userId: "",
    toolId: "",
    startDate: "",
    endDate: "",
    activityType: "",
  });

  const { data: usageLogs, isLoading, isError } = useFetchUsageLogs({
    userId: filters.userId ? Number(filters.userId) : undefined,
    toolId: filters.toolId ? Number(filters.toolId) : undefined,
    startDate: filters.startDate || undefined,
    endDate: filters.endDate || undefined,
    activityType: filters.activityType || undefined,
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      userId: "",
      toolId: "",
      startDate: "",
      endDate: "",
      activityType: "",
    });
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
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
          label="User ID"
          name="userId"
          variant="outlined"
          value={filters.userId}
          onChange={handleFilterChange}
          sx={{ width: { xs: "100%", sm: "200px" } }}
        />
        <TextField
          label="Tool ID"
          name="toolId"
          variant="outlined"
          value={filters.toolId}
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
        />
        <TextField
          label="End Date"
          name="endDate"
          type="date"
          variant="outlined"
          value={filters.endDate}
          onChange={handleFilterChange}
          sx={{ width: { xs: "100%", sm: "200px" } }}
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
                <TableCell>User ID</TableCell>
                <TableCell>Tool ID</TableCell>
                <TableCell>Activity Type</TableCell>
                <TableCell>Activity Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usageLogs?.length > 0 ? (
                usageLogs.map((log: any) => (
                  <TableRow key={log.id}>
                    <TableCell>{log.userId}</TableCell>
                    <TableCell>{log.toolId}</TableCell>
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
    </Box>
  );
};

export default UsageLogsPage;
