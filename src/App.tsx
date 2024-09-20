import { Container } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { API_URL } from "./api";
import { Toast } from "./atoms/Toast";
import { Header } from "./molecules/Header";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Page404 } from "./pages/Page404";
import { Signup } from "./pages/Signup";

export const App = () => {
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });
  const [userData, setUserData] = useState({ name: "", iconUrl: "" });

  useEffect(() => {
    const fetchUserData = async () => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        const userData = await axios.get(`${API_URL}/users`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
        setUserData(userData.data);
      }
    };
    fetchUserData();
  }, [toast]);
  return (
    <>
      <Toast
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
        setToast={setToast}
      />
      <Container
        sx={{ backgroundColor: "#D9D9D9", minHeight: "100vh" }}
        maxWidth={false}
        style={{ paddingLeft: "0", paddingRight: "0" }}
      >
        <Header userData={userData} />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login setToast={setToast} />} />
            <Route path="/signup" element={<Signup setToast={setToast} />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </Container>
      </Container>
    </>
  );
};
