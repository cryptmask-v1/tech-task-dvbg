import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { deleteUser } from "../../services/api";
import type { User } from "../../types";

interface DeleteUserModalProps {
  open: boolean;
  onClose: () => void;
  user: User | null;
  onUserDeleted: (userId: number) => void;
}

const DeleteUserModal = ({
  open,
  onClose,
  user,
  onUserDeleted,
}: DeleteUserModalProps) => {
  const handleDelete = async () => {
    try {
      if (user) {
        await deleteUser(user.id);
        onUserDeleted(user.id);
        onClose();
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Delete User</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete <strong>{user?.name}</strong>?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleDelete} variant="contained" color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteUserModal;
