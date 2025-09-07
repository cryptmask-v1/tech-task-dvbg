import Header from "../../components/Header/Header";
import UserTable from "../../components/UserTable/UserTable";
import { useState, useEffect } from "react";
import { fetchUsers, fetchPosts } from "../../services/api";
import type { User, Post } from "../../types";
import { Button, Box, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { createUser } from "../../services/api";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);

  const [posts, setPosts] = useState<Post[]>([]);

  const [openModal, setOpenModal] = useState(false);

  const [newUser, setNewUser] = useState({
    name: "",
    username: "",
    email: "",
  });

  useEffect(() => {
    const getData = async () => {
      const usersData = await fetchUsers();
      const postsData = await fetchPosts();
      setUsers(usersData);
      setPosts(postsData);
    };
    getData();
  }, []);

  return (
    <div>
      <Header />
      <Box sx={{ px: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
            mt: 1,
          }}
        >
          <Typography variant="h4" component="h1">
            Users Management
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenModal(true)}
          >
            Add User
          </Button>
        </Box>

        <Dialog open={openModal} onClose={() => setOpenModal(false)}>
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
              onChange={(e) =>
                setNewUser({ ...newUser, username: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="Email"
              type="email"
              fullWidth
              variant="outlined"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenModal(false)}>Cancel</Button>
            <Button
              onClick={async () => {
                try {
                  const createdUser = await createUser(newUser);
                  setUsers((prevUsers) => [...prevUsers, createdUser]);
                  setNewUser({ name: "", username: "", email: "" });
                  setOpenModal(false);
                } catch (error) {
                  console.error("Error creating user:", error);
                }
              }}
              variant="contained"
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
        <UserTable users={users} posts={posts} />
      </Box>
    </div>
  );
};

export default UsersPage;
