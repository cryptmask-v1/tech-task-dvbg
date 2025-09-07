import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { createPost } from "../../services/api";
import type { User, Post } from "../../types";

interface AddPostModalProps {
  open: boolean;
  onClose: () => void;
  user: User | null;
  onPostAdded: (post: Post) => void;
}

const AddPostModal = ({
  open,
  onClose,
  user,
  onPostAdded,
}: AddPostModalProps) => {
  const [newPost, setNewPost] = useState({
    title: "",
  });

  const handleSubmit = async () => {
    try {
      if (user) {
        const postData = {
          title: newPost.title,
          user_id: user.id,
        };

        const createdPost = await createPost(postData);
        onPostAdded(createdPost);
        setNewPost({ title: "" });
        onClose();
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Add New Post for{" "}
        <Typography component="span" color="primary" fontWeight="bold">
          {user?.name}
        </Typography>
      </DialogTitle>

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
              value={newPost.title}
              onChange={(e) => setNewPost({ title: e.target.value })}
              fullWidth
              autoFocus
              placeholder="What's on your mind?"
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
            disabled={!newPost.title.trim()}
          >
            Create Post
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddPostModal;
