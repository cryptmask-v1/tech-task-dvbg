import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Post } from "../../types";

interface PostsTableProps {
  posts: Post[];
  onEditPost?: (post: Post) => void;
  onDeletePost?: (post: Post) => void;
}

const PostsTable = ({ posts, onEditPost, onDeletePost }: PostsTableProps) => {
  return (
    <Table size="small" aria-label="posts">
      <TableHead>
        <TableRow>
          <TableCell>Post ID</TableCell>
          <TableCell>Title</TableCell>
          <TableCell align="right">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {posts.map((post) => (
          <TableRow key={post.id}>
            <TableCell component="th" scope="row">
              {post.id}
            </TableCell>
            <TableCell>{post.title}</TableCell>
            <TableCell sx={{ pr: 0 }} align="right">
              <Box
                sx={{
                  display: "flex",
                  gap: 1.5,
                  justifyContent: "flex-end",
                }}
              >
                <IconButton
                  size="medium"
                  color="primary"
                  onClick={() => onEditPost?.(post)}
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
                  size="medium"
                  color="error"
                  onClick={() => onDeletePost?.(post)}
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
        ))}
      </TableBody>
    </Table>
  );
};

export default PostsTable;
