import React from "react";
import {
  Box,
  Button,
  Collapse,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PostsTable from "./PostsTable";
import AddIcon from "@mui/icons-material/Add";
import type { User, Post } from "../../types";

interface UserTableRowProps {
  user: User;
  userPosts: Post[];
  onEditUser: (user: User) => void;
  onDeleteUser: (user: User) => void;
  onEditPost?: (post: Post) => void;
  onDeletePost?: (post: Post) => void;
  onAddPost?: (user: User) => void;
}

const UserTableRow = ({
  user,
  userPosts,
  onEditUser,
  onDeleteUser,
  onEditPost,
  onDeletePost,
  onAddPost,
}: UserTableRowProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {user.id}
        </TableCell>
        <TableCell>{user.name}</TableCell>
        <TableCell>{user.username}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell align="center">
          <Box sx={{ display: "flex", gap: 1.5, justifyContent: "center" }}>
            <IconButton
              aria-label="edit"
              color="primary"
              size="medium"
              onClick={() => onEditUser(user)}
              sx={{
                backgroundColor: "rgba(25, 118, 210, 0.08)",
                "&:hover": {
                  backgroundColor: "rgba(25, 118, 210, 0.12)",
                },
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton
              aria-label="delete"
              color="error"
              size="medium"
              onClick={() => onDeleteUser(user)}
              sx={{
                backgroundColor: "rgba(211, 47, 47, 0.08)",
                "&:hover": {
                  backgroundColor: "rgba(211, 47, 47, 0.12)",
                },
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" gutterBottom component="div">
                  User Posts
                </Typography>
                <Button
                  size="small"
                  startIcon={<AddIcon />}
                  onClick={() => onAddPost?.(user)} // Handler çağır
                  variant="outlined"
                >
                  Add Post
                </Button>
              </Box>
              <PostsTable
                posts={userPosts}
                onEditPost={onEditPost}
                onDeletePost={onDeletePost}
              />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default UserTableRow;
