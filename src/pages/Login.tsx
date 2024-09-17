import { Box, Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";

export const Login: React.FC = () => {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Box
        sx={{ width: "500px", margin: "80px auto", textAlign: "center" }}
        component="form"
        noValidate
      >
        <TextField
          margin="normal"
          required
          fullWidth
          label="メールアドレス"
          id="email"
          type="email"
          name="email"
          autoComplete="email"
          autoFocus
          value=""
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="パスワード"
          id="password"
          type="password"
          name="password"
          autoComplete="password"
          value=""
        />

        <Button
          sx={{ color: "#fff", margin: "auto", display: "inline-block" }}
          type="submit"
          variant="contained"
          color="primary"
        >
          ログイン
        </Button>
      </Box>
      <Link to="/signup">アカウントを新規作成</Link>
    </Box>
  );
};
