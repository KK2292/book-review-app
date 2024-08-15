import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { PageTitle } from "../atoms/PageTitle";
import { Page1Column } from "../templates/Page1Column";


export const CreateNewThread: React.FC = () => {

  const [titleTextField, setTitleTextField] = useState("");

  const onClickCreateNewThred = () => {
    fetch("https://railway.bulletinboard.techtrain.dev/threads", {
      method: "POST",
      body: JSON.stringify({
        title: titleTextField,
      }),
    })
      .then(() =>
        fetch("https://railway.bulletinboard.techtrain.dev/threads").then(() =>
          setTitleTextField("")
        )
      )
      .catch(() => alert("スレッドの作成に失敗しました"));
  };

  return (
    <>
      <PageTitle>スレッドの新規作成</PageTitle>
      <Page1Column>
        <TextField
          id="outlined-basic"
          placeholder="スレッド名を入力"
          variant="outlined"
          value={titleTextField}
          onChange={(e) => setTitleTextField(e.target.value)}
          sx={{ backgroundColor: "#fff", borderRadius: "5px" }}
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
            disabled={!titleTextField}
          >
            作成
          </Button>
        </Box>
      </Page1Column>
    </>
  );
};
