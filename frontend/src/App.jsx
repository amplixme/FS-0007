import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import CreatePost from "./pages/CreatePost";
<<<<<<< HEAD
import PostDetail from "./pages/PostDetail";
=======
import EditPost from "./pages/EditPost";

>>>>>>> 9856895f05ae331bab8f27094acdcfd0d9611751

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
<<<<<<< HEAD
            <Route path="/crear" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
            <Route path="/posts/:id" element={<PostDetail />} />
=======
            <Route
              path="/crear"
              element={
                <ProtectedRoute>
                  <CreatePost />
                </ProtectedRoute>
              }
            />
            <Route
              path="/posts/:id/editar"
              element={
                <ProtectedRoute>
                  <EditPost />
                </ProtectedRoute>
              }
            />
>>>>>>> 9856895f05ae331bab8f27094acdcfd0d9611751
          </Routes>
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
