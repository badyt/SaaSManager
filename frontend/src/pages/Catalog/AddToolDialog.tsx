import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { toast } from "react-toastify";

interface AddToolDialogProps {
  open: boolean;
  onClose: () => void;
  onAddTool: (tool: { name: string; description: string; default_cost: number }) => void;
}

const AddToolDialog: React.FC<AddToolDialogProps> = ({ open, onClose, onAddTool }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [defaultCost, setDefaultCost] = useState<number | string>("");

  const handleAddTool = () => {
    if (!name || !description || defaultCost === "") {
      toast.error("Please fill all the fields!");
      return;
    }

    onAddTool({
      name,
      description,
      default_cost: Number(defaultCost),
    });

    // Reset the fields and close the dialog
    setName("");
    setDescription("");
    setDefaultCost("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New SaaS Tool</DialogTitle>
      <DialogContent>
        <TextField
          label="Tool Name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Default Cost"
          variant="outlined"
          fullWidth
          type="number"
          value={defaultCost}
          onChange={(e) => setDefaultCost(e.target.value)}
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleAddTool} color="primary" variant="contained">
          Add Tool
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddToolDialog;
