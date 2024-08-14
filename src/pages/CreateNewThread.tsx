import { Box, Button, TextField } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { Link } from "react-router-dom";
import { H2 } from "../atoms/H2";
import { Thread } from "../type/Thread";
import { Page1Column } from "../templates/Page1Column";
import { v4 as uuidv4 } from "uuid";

interface CreateNewThreadProps {
  threads: Thread[];
  setThreads: Dispatch<SetStateAction<Thread[]>>;
}

export const CreateNewThread: React.FC<CreateNewThreadProps> = (props) => {
  const { threads, setThreads } = props;
  const [title, setTitle] = useState("");

  const onClickCreateNewThred = () => {
    fetch("https://railway.bulletinboard.techtrain.dev/threads", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        id: uuidv4(),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const newThread: Thread = {
          title: data.title,
          id: data.id,
        };
        console.log([...threads, newThread]);

        setThreads([...threads, newThread]);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <H2>スレッドの新規作成</H2>
      <Page1Column>
        <TextField
          id="filled-basic"
          placeholder="スレッド名を入力"
          variant="filled"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link to="/">TOPに戻る</Link>
          <Button
            variant="contained"
            sx={{ color: "#fff" }}
            onClick={onClickCreateNewThred}
            disabled={!title}
          >
            作成
          </Button>
        </Box>
      </Page1Column>
    </>
  );
};
