import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Header } from "./molecules/Header";
import { Page404 } from "./Page404";
import { CreateNewThread } from "./pages/CreateNewThread";
import { Home } from "./pages/Home";
import { PageTemplate } from "./templates/PageTemplate";
import { Thread } from "./type/Thread";

export const App: React.FC = () => {
  const [threads, setThreads] = useState<Thread[]>([]);

  return (
    <>
      <Header />
      <PageTemplate>
        <Routes>
          <Route path="/" element={<Home threads={threads} />} />
          <Route
            path="/threads/new"
            element={
              <CreateNewThread setThreads={setThreads} threads={threads} />
            }
          />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </PageTemplate>
    </>
  );
};
