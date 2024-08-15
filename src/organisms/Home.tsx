import { List, ListItem, ListItemText, styled } from "@mui/material";
import { PageTitle } from "../atoms/PageTitle";
import { Page1Column } from "../templates/Page1Column";
import { Thread } from "../type/Thread";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const SListItem = styled(ListItem)`
  text-align: center;
  border: 1px solid #ddd;
  border-top: none;
  transition: 0.1s;
  &:first-of-type {
    border-top: 1px solid #ddd;
  }
  &:hover {
    background-color: #66d48b;
    color: #fff;
  }
`;

export const Home: React.FC = () => {
  const navigate = useNavigate();

  const [threads, setThreads] = useState<Thread[]>([]);

  useEffect(() => {
    fetch("https://railway.bulletinboard.techtrain.dev/threads").then(
      (response) =>
        response.json().then((data) => {
          setThreads(data);
        })
    );
  }, []);

  const onClickThread = (thread: Thread) => {
    navigate(`/threads/${thread.id}`, { state: { thread } });
  };

  return (
    <>
      <PageTitle>新着スレッド</PageTitle>
      <Page1Column>
        <List>
          {threads.map((thread) => (
            <SListItem
              key={thread.id}
              onClick={() => {
                onClickThread(thread);
              }}
              sx={{ backgroundColor: "#fff" }}
            >
              <ListItemText primary={thread.title} />
            </SListItem>
          ))}
        </List>
      </Page1Column>
    </>
  );
};
