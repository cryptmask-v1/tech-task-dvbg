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
import AddPostModal from "../../components/Modals/AddPostModal";
import EditPostModal from "../../components/Modals/EditPostModal";
import DeletePostModal from "../../components/Modals/DeletePostModal";

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  // Modal states
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openAddPostModal, setOpenAddPostModal] = useState(false);
  const [openEditPostModal, setOpenEditPostModal] = useState(false);
  const [openDeletePostModal, setOpenDeletePostModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleUserAdded = (user: User) => {
    setUsers((prev) => [...prev, user]);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setOpenEditModal(true);
  };

  const handleDeleteUser = (user: User) => {
    setSelectedUser(user);
    setOpenDeleteModal(true);
  };

  const handleUserUpdated = (updatedUser: User) => {
    setUsers((users) =>
      users.map((u) => (u.id === updatedUser.id ? updatedUser : u))
    );
  };

  const handleUserDeleted = (userId: number) => {
    setUsers((users) => users.filter((u) => u.id !== userId));
  };

  const handleAddPost = (user: User) => {
    setSelectedUser(user);
    setOpenAddPostModal(true);
  };

  const handlePostAdded = (post: Post) => {
    setPosts((prev) => [...prev, post]);
    setOpenAddPostModal(false);
  };

  const handleEditPost = (post: Post) => {
    setSelectedPost(post);
    setOpenEditPostModal(true);
  };

  const handleDeletePost = (post: Post) => {
    setSelectedPost(post);
    setOpenDeletePostModal(true);
  };

  const handlePostUpdated = (updatedPost: Post) => {
    setPosts((posts) =>
      posts.map((p) => (p.id === updatedPost.id ? updatedPost : p))
    );
  };

  const handlePostDeleted = (postId: number) => {
    setPosts((posts) => posts.filter((p) => p.id !== postId));
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
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: 2, sm: 0 },
          }}
        >
          <Typography 
            variant="h4" 
            component="h1"
            sx={{
              fontSize: { xs: "1.5rem", sm: "2rem", md: "2.125rem" },
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            Users Management
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenAddModal(true)}
            size="large"
            sx={{
              minWidth: { xs: "200px", sm: "auto" },
              borderRadius: "12px",
              fontWeight: 600,
              textTransform: "none",
              boxShadow: "0 4px 12px rgba(25, 118, 210, 0.3)",
              "&:hover": {
                boxShadow: "0 6px 16px rgba(25, 118, 210, 0.4)",
                transform: "translateY(-2px)",
              },
              transition: "all 0.2s ease-in-out",
            }}
          >
            <Box
              component="span"
              sx={{ display: { xs: "none", sm: "inline" } }}
            >
              Add User
            </Box>
            <Box
              component="span"
              sx={{ display: { xs: "inline", sm: "none" } }}
            >
              Add New User
            </Box>
          </Button>
        </Box>

        <UserTable
          users={users}
          posts={posts}
          onEditUser={handleEditUser}
          onDeleteUser={handleDeleteUser}
          onAddPost={handleAddPost}
          onEditPost={handleEditPost}
          onDeletePost={handleDeletePost}
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

        <AddPostModal
          open={openAddPostModal}
          onClose={() => setOpenAddPostModal(false)}
          user={selectedUser}
          onPostAdded={handlePostAdded}
        />

        <EditPostModal
          open={openEditPostModal}
          onClose={() => setOpenEditPostModal(false)}
          post={selectedPost}
          onPostUpdated={handlePostUpdated}
        />

        <DeletePostModal
          open={openDeletePostModal}
          onClose={() => setOpenDeletePostModal(false)}
          post={selectedPost}
          onPostDeleted={handlePostDeleted}
        />
      </Box>
    </div>
  );
};

export default UsersPage;
