import Header from "../../components/Header/Header";
import UserTable from "../../components/UserTable/UserTable";
import AddUserModal from "../../components/Modals/AddUserModal";
import EditUserModal from "../../components/Modals/EditUserModal";
import DeleteUserModal from "../../components/Modals/DeleteUserModal";
import { useState, useEffect } from "react";
import { fetchUsers, fetchPosts } from "../../services/api";
import type { User, Post } from "../../types";
import { Button, Box, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  // Modal states
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setOpenEditModal(true);
  };

  const handleDeleteUser = (user: User) => {
    setSelectedUser(user);
    setOpenDeleteModal(true);
  };

  const handleUserAdded = (user: User) => {
    setUsers((prev) => [...prev, user]);
  };

  const handleUserUpdated = (updatedUser: User) => {
    setUsers((users) =>
      users.map((u) => (u.id === updatedUser.id ? updatedUser : u))
    );
  };

  const handleUserDeleted = (userId: number) => {
    setUsers((users) => users.filter((u) => u.id !== userId));
  };

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
            onClick={() => setOpenAddModal(true)}
          >
            Add User
          </Button>
        </Box>

        <UserTable
          users={users}
          posts={posts}
          onEditUser={handleEditUser}
          onDeleteUser={handleDeleteUser}
        />

        {/* Modular Modals */}
        <AddUserModal
          open={openAddModal}
          onClose={() => setOpenAddModal(false)}
          onUserAdded={handleUserAdded}
        />

        <EditUserModal
          open={openEditModal}
          onClose={() => setOpenEditModal(false)}
          user={selectedUser}
          onUserUpdated={handleUserUpdated}
        />

        <DeleteUserModal
          open={openDeleteModal}
          onClose={() => setOpenDeleteModal(false)}
          user={selectedUser}
          onUserDeleted={handleUserDeleted}
        />
      </Box>
    </div>
  );
};

export default UsersPage;
