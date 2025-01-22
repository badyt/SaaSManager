import React, { useEffect, useState } from "react";
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
import { useAddSaasTool, useFetchCatalog, useRemoveSaaSTool } from "../../hooks/useCatalog";
import AddToolDialog from "./AddToolDialog";
import { useQueryClient } from "react-query";
import ToolDetailsDialog from "./ToolDetailsDialog";

const CatalogPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: catalog } = useFetchCatalog();
  const addToolMutation = useAddSaasTool();
  const removeToolMutation = useRemoveSaaSTool();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const queryClient = useQueryClient();
  const [selectedTool, setSelectedTool] = useState<CatalogTool | null>(null);

  const filteredTools = catalog?.filter(
    (tool: CatalogTool) =>
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddTool = (tool: { name: string; description: string; default_cost: number }) => {
    addToolMutation.mutate(tool
      , {
        onSuccess: () => {
          toast.success("successfully added tool!");
          queryClient.invalidateQueries(["catalog"]);
        },
        onError: (error) => { toast.error(`error occurred adding the tool to catalog: ${error}`) }
      });
  };

  const handleViewDetails = (tool: CatalogTool) => {
    setSelectedTool(tool);
  };

  const handleRemoveTool = (toolId: number) => {
    removeToolMutation.mutate(toolId
      , {
        onSuccess: async () => {
          toast.success("successfully removed tool!");
          queryClient.invalidateQueries(["catalog"]);
          queryClient.invalidateQueries(["subscriptions"]);
          await queryClient.refetchQueries(["subscriptions"]);
        },
        onError: (error) => { toast.error(`error occurred removing the tool from catalog: ${error}`) },
        onSettled: () => {
      }
      });
  };

  return (
    <Box sx={{ padding: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        SaaS Tools Catalog
      </Typography>

      <Box sx={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}>
        <TextField
          label="Search Tools"
          variant="outlined"
          size="small"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsAddDialogOpen(true)}
          sx={{
            whiteSpace: "nowrap"
          }}
        >
          Add New Tool
        </Button>
      </Box>

      <Grid2
        container
        spacing={2}
        sx={{ display: "flex", flexWrap: "wrap" }}
      >
        {filteredTools?.map((tool: CatalogTool) => (
          <Grid2
            key={tool.tool_id}
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
                  {tool.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {tool.description}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.primary"
                  sx={{ marginTop: "1rem" }}
                >
                  Cost: ${tool.default_cost.toFixed(2)}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => handleViewDetails(tool)}
                >
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid2>
        ))}
      </Grid2>
      <AddToolDialog
        open={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAddTool={handleAddTool}
      />
      <ToolDetailsDialog
        open={!!selectedTool}
        onClose={() => setSelectedTool(null)}
        tool={selectedTool}
        onRemoveTool={handleRemoveTool}
      />
    </Box>
  );
};

export default CatalogPage;
