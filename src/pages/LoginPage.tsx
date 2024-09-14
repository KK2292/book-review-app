import { Box, Button, TextField } from "@mui/material";

export const LoginPage: React.FC = () => {
  return (
    <Box
      sx={{ width: "500px", margin: "80px auto", textAlign: "center" }}
      component="form"
      noValidate
      autoComplete="off"
    >
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="メールアドレス"
        type="password"
        name="email"
        autoComplete="email"
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="パスワード"
        type="password"
        id="password"
        autoComplete="current-password"
      />
      <Button
        sx={{ color: "#fff" }}
        type="submit"
        variant="contained"
        color="primary"
      >
        ログイン
      </Button>
    </Box>
  );
};
