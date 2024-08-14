import { AppBar, Button, styled, Typography } from "@mui/material";

export const Header = () => {
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
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "5px 20px",
      }}
    >
      <Typography variant="h1" sx={{ fontSize: "20px", color: "#fff" }}>
        掲示板
      </Typography>
      <SButton variant="outlined">スレッドを立てる</SButton>
    </AppBar>
  );
};
