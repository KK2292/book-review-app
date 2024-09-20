import { AppBar, Box, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Header = (props: {
  userData: { name: string; iconUrl: string };
}) => {
  const { userData } = props;
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate("/");
  };
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
          書籍レビューアプリ
        </Typography>
        <Button
          sx={{ color: "#fff" }}
          onClick={() => localStorage.removeItem("token")}
        >
          トークン削除
        </Button>
        <Box sx={{ display: "flex", alignItems: "center", gap: "0 16px" }}>
          <Typography sx={{ color: "#fff" }}>{userData.name}</Typography>
          <Box
            component="img"
            src={userData.iconUrl ?? "default.jpg"}
            sx={{ width: "40px", height: "40px", borderRadius: "50%" }}
          />
        </Box>
      </Stack>
    </AppBar>
  );
};
