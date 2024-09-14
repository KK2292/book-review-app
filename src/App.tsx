import { Container } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { Header } from "./molecules/Header";
import { Home } from "./pages/Home";
import { Page404 } from "./pages/Page404";
import { LoginPage } from "./pages/LoginPage";

export const App: React.FC = () => {
  return (
    <>
      <Container
        sx={{ backgroundColor: "#D9D9D9", minHeight: "100vh" }}
        maxWidth={false}
        style={{ paddingLeft: "0", paddingRight: "0" }}
      >
        <Header />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </Container>
      </Container>
    </>
  );
};
