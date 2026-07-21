import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import CreatePost from "./pages/CreatePost";
import PostDetail from "./pages/PostDetail";
import CategoriesAdmin from "./pages/CategoriesAdmin";
import NotFound from "./pages/NotFound";
import ErrorBoundary from "./components/common/ErrorBoundary";
import ProfilePublic from "./pages/ProfilePublic";
import ProtectedAdminRoute from "./components/ProtectedAminRoute";
import AdminPage from "./components/admin/AdminPage";

import ProfileEdit from "./pages/ProfileEdit";
function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/crear" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
              <Route path="/posts/:id" element={<PostDetail />} />
              <Route path="/categorias" element={  <ProtectedRoute>  <CategoriesAdmin />  </ProtectedRoute> }/>
              <Route path="/profile/:id" element={ <ProfilePublic />}/>
              <Route path="/profile/editar" element={ <ProtectedRoute> <ProfileEdit /> </ProtectedRoute> }/>
              <Route path="*" element={<NotFound />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <ProtectedAdminRoute>
                      <AdminPage />
                    </ProtectedAdminRoute>
                  </ProtectedRoute>
                }
              />
              <Route path="/profile/:id" element={<ProfilePublic />} />
            </Routes>
          </Layout>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
