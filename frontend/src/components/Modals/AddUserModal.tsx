import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { useState } from "react";
import { createUser } from "../../services/api";
import type { User } from "../../types";

interface AddUserModalProps {
  open: boolean;
  onClose: () => void;
  onUserAdded: (user: User) => void;
}

const AddUserModal = ({ open, onClose, onUserAdded }: AddUserModalProps) => {
  const [newUser, setNewUser] = useState({
    name: "",
    username: "",
    email: "",
  });

  const handleSubmit = async () => {
    try {
      const createdUser = await createUser(newUser);
      onUserAdded(createdUser);
      setNewUser({ name: "", username: "", email: "" });
      onClose();
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New User</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          type="text"
          fullWidth
          variant="outlined"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <TextField
          margin="dense"
          label="Username"
          type="text"
          fullWidth
          variant="outlined"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
        />
        <TextField
          margin="dense"
          label="Email"
          type="email"
          fullWidth
          variant="outlined"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUserModal;
