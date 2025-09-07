import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import UserTableRow from "./UserTableRow";
import type { User, Post } from "../../types";

interface UserTableProps {
  users: User[];
  posts: Post[];
  onEditUser: (user: User) => void;
  onDeleteUser: (user: User) => void;
  onEditPost?: (post: Post) => void;
  onDeletePost?: (post: Post) => void;
  onAddPost?: (user: User) => void;
}

const UserTable = ({
  users,
  posts,
  onEditUser,
  onDeleteUser,
  onEditPost,
  onDeletePost,
  onAddPost,
}: UserTableProps) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => {
            const userPosts = posts.filter((post) => post.user_id === user.id);
            return (
              <UserTableRow
                key={user.id}
                user={user}
                userPosts={userPosts}
                onEditUser={onEditUser}
                onDeleteUser={onDeleteUser}
                onEditPost={onEditPost}
                onDeletePost={onDeletePost}
                onAddPost={onAddPost}
              />
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
