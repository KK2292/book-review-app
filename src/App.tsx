import { Container } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { Header } from "./molecules/Header";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Page404 } from "./pages/Page404";
import { Signup } from "./pages/Signup";
import { Toast } from "./atoms/Toast";
import { useState } from "react";

export const App: React.FC = () => {
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });
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
        <Header />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup setToast={setToast} />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </Container>
      </Container>
    </>
  );
};
