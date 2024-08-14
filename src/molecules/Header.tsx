import { AppBar, Button, Stack, styled, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Header: React.FC = () => {
  const navigate = useNavigate();

  const navigateToCreateNewThread = () => {
    navigate("/threads/new");
  };
  const navigateToHome = () => {
    navigate("/");
  };
  const SButton = styled(Button)`
    color: #fff;
    border-color: #fff;
    display: inline-block;
    &&:hover {
      opacity: 0.7;
    }
  `;
  return (
    <AppBar
      position="static"
      sx={{
        padding: "5px 40px",
      }}
    >
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          maxWidth: "1080px",
          margin: "auto",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: "20px",
            color: "#fff",
            cursor: "pointer",
            ":hover": { opacity: 0.7 },
          }}
          onClick={navigateToHome}
        >
          掲示板
        </Typography>
        <SButton variant="outlined" onClick={navigateToCreateNewThread}>
          スレッドを立てる
        </SButton>
      </Stack>
    </AppBar>
  );
};
