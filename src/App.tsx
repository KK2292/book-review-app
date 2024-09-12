import { Container } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { Header } from "./molecules/Header";
import { Home } from "./organisms/Home";
import { Page404 } from "./Page404";

export const App: React.FC = () => {
  return (
    <>
      <Container
        sx={{ backgroundColor: "#D9D9D9", minHeight: "100vh" }}
        maxWidth={false}
        style={{ paddingLeft: "0", paddingRight: "0" }}
      >
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Container>
    </>
  );
};
