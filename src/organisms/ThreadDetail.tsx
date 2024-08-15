import { FC, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { PageTitle } from "../atoms/PageTitle";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
} from "@mui/material";

type post = {
  id: string;
  post: string;
};

export const ThreadDetail: FC = () => {
  const location = useLocation();
  const { thread } = location.state;
  const [posts, setPosts] = useState<post[]>([]);
  const [postTextField, setPostTextField] = useState("");

  useEffect(() => {
    fetch(
      `https://railway.bulletinboard.techtrain.dev/threads/${thread.id}/posts`
    ).then((response) =>
      response.json().then((data) => {
        console.log(data);
        setPosts(data.posts);
      })
    );
  }, [thread.id]);

  const onClickPost = () => {
    fetch(
      `https://railway.bulletinboard.techtrain.dev/threads/${thread.id}/posts`,
      {
        method: "POST",
        body: JSON.stringify({
          post: postTextField,
        }),
      }
    )
      .then(() =>
        fetch(
          `https://railway.bulletinboard.techtrain.dev/threads/${thread.id}/posts`
        ).then((response) =>
          response.json().then((data) => {
            console.log(data.posts);
            setPosts(data.posts);
            setPostTextField("");
          })
        )
      )
      .catch(() => alert("投稿に失敗しました"));
  };

  return (
    <>
      <PageTitle>{thread.title}</PageTitle>
      <Box
        display="grid"
        gridTemplateColumns="1fr 300px"
        gridTemplateRows="repeat(2, 1fr)"
        sx={{
          gridColumnGap: "50px",
          width: "100%",
        }}
      >
        <Box sx={{ gridArea: "1 / 1 / 3 / 2", minWidth: "400px" }}>
          <List sx={{ padding: 0 }}>
            <Stack spacing={1}>
              {posts.length === 0 ? (
                <div>まだ投稿がありません</div>
              ) : (
                posts.map((post) => (
                  <ListItem key={post.id} sx={{ backgroundColor: "#fff" }}>
                    <ListItemText primary={post.post} />
                  </ListItem>
                ))
              )}
            </Stack>
          </List>
        </Box>
        <Box sx={{ gridArea: "1 / 2 / 3 / 3" }}>
          <Stack spacing={2}>
            <TextField
              value={postTextField}
              onChange={(e) => setPostTextField(e.target.value)}
              id="outlined-multiline-static"
              multiline
              rows={4}
              placeholder="投稿内容を入力"
              InputProps={{
                sx: { backgroundColor: "#fff", borderRadius: "5px" },
              }}
            />
            <Button
              onClick={onClickPost}
              disabled={!postTextField}
              variant="contained"
              sx={{ color: "#fff" }}
            >
              投稿
            </Button>
          </Stack>
        </Box>
      </Box>
    </>
  );
};
