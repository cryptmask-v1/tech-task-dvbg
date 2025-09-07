import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { deletePost } from "../../services/api";
import type { Post } from "../../types";

interface DeletePostModalProps {
  open: boolean;
  onClose: () => void;
  post: Post | null;
  onPostDeleted: (postId: number) => void;
}

const DeletePostModal = ({
  open,
  onClose,
  post,
  onPostDeleted,
}: DeletePostModalProps) => {
  const handleDelete = async () => {
    try {
      if (post) {
        await deletePost(post.id);
        onPostDeleted(post.id);
        onClose();
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Delete Post</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete the post{" "}
          <strong>"{post?.title}"</strong>?
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

export default DeletePostModal;
