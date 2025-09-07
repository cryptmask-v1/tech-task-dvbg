import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { useState, useEffect } from "react";
import { updateUser } from "../../services/api";
import type { User } from "../../types";

interface EditUserModalProps {
  open: boolean;
  onClose: () => void;
  user: User | null;
  onUserUpdated: (user: User) => void;
}

const EditUserModal = ({
  open,
  onClose,
  user,
  onUserUpdated,
}: EditUserModalProps) => {
  const [editUser, setEditUser] = useState({
    name: "",
    username: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
      setEditUser({
        name: user.name,
        username: user.username,
        email: user.email,
      });
    }
  }, [user]);

  const handleSubmit = async () => {
    try {
      if (user) {
        const updatedUser = await updateUser(user.id, editUser);
        onUserUpdated(updatedUser);
        onClose();
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="Name"
            value={editUser.name}
            onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
            fullWidth
          />
          <TextField
            label="Username"
            value={editUser.username}
            onChange={(e) =>
              setEditUser({ ...editUser, username: e.target.value })
            }
            fullWidth
          />
          <TextField
            label="Email"
            type="email"
            value={editUser.email}
            onChange={(e) =>
              setEditUser({ ...editUser, email: e.target.value })
            }
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUserModal;
