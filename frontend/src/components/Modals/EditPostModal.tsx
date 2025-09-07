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
import { updatePost } from "../../services/api";
import type { Post } from "../../types";

interface EditPostModalProps {
  open: boolean;
  onClose: () => void;
  post: Post | null;
  onPostUpdated: (post: Post) => void;
}

const EditPostModal = ({
  open,
  onClose,
  post,
  onPostUpdated,
}: EditPostModalProps) => {
  const [editPost, setEditPost] = useState({
    title: "",
  });

  useEffect(() => {
    if (post) {
      setEditPost({
        title: post.title,
      });
    }
  }, [post]);

  const handleSubmit = async () => {
    try {
      if (post) {
        const updatedPost = await updatePost(post.id, editPost);
        onPostUpdated(updatedPost);
        onClose();
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Post</DialogTitle>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <TextField
              label="Post Title"
              value={editPost.title}
              onChange={(e) => setEditPost({ title: e.target.value })}
              fullWidth
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            type="submit"
            variant="contained"
            disabled={!editPost.title.trim()}
          >
            Update Post
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditPostModal;
