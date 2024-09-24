import { Container } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { API_URL } from "./api";
import { Toast } from "./atoms/Toast";
import { Header } from "./molecules/Header";
import { EditReview } from "./pages/EditReview";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Page404 } from "./pages/Page404";
import { Profile } from "./pages/Profile";
import { RegisterReview } from "./pages/RegisterReview";
import { ReviewDetail } from "./pages/ReviewDetail";
import { Signup } from "./pages/Signup";

export const App = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });
  const [userData, setUserData] = useState({ name: null, iconUrl: null });
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("token") ? true : false
  );

  useEffect(() => {
    const fetchUserData = async () => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        try {
          const userData = await axios.get(`${API_URL}/users`, {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          });
          setUserData(userData.data);
        } catch (error) {
          console.error(error);
        }
      } else {
        if (userData.name === null) return;
        setUserData({ name: null, iconUrl: null });
      }
    };
    fetchUserData();
  }, [userData.name, isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);
  return (
    <>
      <Toast
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
        setToast={setToast}
      />
      <Container
        sx={{ backgroundColor: "#eee", minHeight: "100vh" }}
        maxWidth={false}
        style={{ paddingLeft: "0", paddingRight: "0" }}
      >
        <Header
          userData={userData}
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />
        <Container>
          <Routes>
            <Route
              path="/"
              element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <Navigate to="/" />
                ) : (
                  <Login
                    setToast={setToast}
                    setIsAuthenticated={setIsAuthenticated}
                  />
                )
              }
            />
            <Route
              path="/signup"
              element={
                isAuthenticated ? (
                  <Navigate to="/" />
                ) : (
                  <Signup
                    setToast={setToast}
                    setIsAuthenticated={setIsAuthenticated}
                  />
                )
              }
            />
            <Route
              path="/profile"
              element={<Profile userName={userData.name} setToast={setToast} />}
            />
            <Route
              path="/new"
              element={<RegisterReview setToast={setToast} />}
            />
            <Route path="/detail/:id" element={<ReviewDetail />} />
            <Route
              path="/edit/:id"
              element={<EditReview setToast={setToast} />}
            />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </Container>
      </Container>
    </>
  );
};
