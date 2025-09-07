import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage.tsx";
import UserList from "./pages/UsersPage/UsersPage.tsx";
import PostPage from "./pages/PostPage/PostPage.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/posts" element={<PostPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
