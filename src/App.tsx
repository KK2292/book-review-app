import { Container } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { Header } from "./molecules/Header";
import { CreateNewThread } from "./organisms/CreateNewThread";
import { Home } from "./organisms/Home";
import { ThreadDetail } from "./organisms/ThreadDetail";
import { Page404 } from "./Page404";
import { PageTemplate } from "./templates/PageTemplate";

export const App: React.FC = () => {
  return (
    <>
      <Container
        sx={{ backgroundColor: "#D9D9D9", minHeight: "100vh" }}
        maxWidth={false}
        style={{ paddingLeft: "0", paddingRight: "0" }}
      >
        <Header />
        <PageTemplate>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/threads/new" element={<CreateNewThread />} />
            <Route path="/threads/:thread_id" element={<ThreadDetail />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </PageTemplate>
      </Container>
    </>
  );
};
