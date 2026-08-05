import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ErrorBoundary from "./components/common/ErrorBoundary";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedAdminRoute from "./components/ProtectedAminRoute";
import React, { Suspense } from "react";

const AdminPage = React.lazy(() => import("./components/admin/AdminPage"));
const Home = React.lazy(() => import("./pages/Home"));
const Login = React.lazy(() => import("./pages/Login"));
const Register = React.lazy(() => import("./pages/Register"));
const CreatePost = React.lazy(() => import("./pages/CreatePost"));
const PostDetail = React.lazy(() => import("./pages/PostDetail"));
const CategoriesAdmin = React.lazy(() => import("./pages/CategoriesAdmin"));
const ProfilePublic = React.lazy(() => import("./pages/ProfilePublic"));
const ProfileEdit = React.lazy(() => import("./pages/ProfileEdit"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <Layout>
            <Suspense fallback={<div>Cargando...</div>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/crear" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
                <Route path="/posts/:id" element={<PostDetail />} />
                <Route path="/categorias" element={<ProtectedRoute><CategoriesAdmin /></ProtectedRoute>} />
                <Route path="/profile/:id" element={<ProfilePublic />} />
                <Route path="/profile/editar" element={<ProtectedRoute><ProfileEdit /></ProtectedRoute>} />
                <Route path="/admin" element={<ProtectedRoute>                      <ProtectedAdminRoute>                        <AdminPage />                      </ProtectedAdminRoute>                    </ProtectedRoute>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </Layout>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
export default App;
