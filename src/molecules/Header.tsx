import { AppBar, Box, Button, Stack, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

export const Header = (props: {
  userData: { name: string | null; iconUrl: string | null };
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}) => {
  const { userData, isAuthenticated, setIsAuthenticated } = props;
  const navigate = useNavigate();
  const location = useLocation();

  const navigateToHome = () => {
    navigate("/");
  };

  const navigateToProfile = () => {
    navigate("/profile");
  };

  const onClickLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
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
        {isAuthenticated && (
          <Button sx={{ color: "#fff" }} onClick={onClickLogout}>
            ログアウト
          </Button>
        )}

        {location.pathname === "/" && (
          <Button sx={{ color: "#fff" }} onClick={navigateToProfile}>
            ユーザー情報
          </Button>
        )}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "0 16px",
            position: "relative",
          }}
        >
          <Typography sx={{ color: "#fff" }}>
            {userData.name ?? "未ログイン"}
          </Typography>
          <Box
            component="img"
            src={userData.iconUrl ?? "default.jpg"}
            alt="icon"
            sx={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
            }}
          />
        </Box>
      </Stack>
    </AppBar>
  );
};
