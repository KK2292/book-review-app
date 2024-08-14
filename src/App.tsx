import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Header } from "./molecules/Header";
import { Page404 } from "./Page404";
import { CreateNewThread } from "./organisms/CreateNewThread";
import { Home } from "./organisms/Home";
import { PageTemplate } from "./templates/PageTemplate";
import { Thread } from "./type/Thread";
import { ThreadDetail } from "./organisms/ThreadDetail";

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
          <Route path="/threads/:" element={<ThreadDetail />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </PageTemplate>
    </>
  );
};
