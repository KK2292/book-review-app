import { Box, Button, Link, TextField } from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import { API_URL } from "../api";
import { ValidationMessage } from "../atoms/ValidationMessage";
import { userData } from "../types/userData";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userData>();
  const onSubmit = async (formData: userData) => {
    try {
      const userResponse = await axios.post(`${API_URL}/signin`, formData);
      const tokenResponsed = userResponse.data.token;
      localStorage.setItem("token", tokenResponsed);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={{ textAlign: "center" }}>
      <Box
        sx={{ width: "500px", margin: "80px auto", textAlign: "center" }}
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          label="メールアドレス"
          id="email"
          type="email"
          autoComplete="email"
          autoFocus
          {...register("email", {
            required: "メールアドレスを入力してください",
          })}
        />
        {errors.email && (
          <ValidationMessage>
            {errors.email.message as string}
          </ValidationMessage>
        )}
        <TextField
          margin="normal"
          required
          fullWidth
          label="パスワード"
          id="password"
          type="password"
          autoComplete="password"
          {...register("password", {
            required: "パスワードを入力してください",
          })}
        />
        {errors.password && (
          <ValidationMessage>
            {errors.password.message as string}
          </ValidationMessage>
        )}
        <Button
          sx={{ color: "#fff", margin: "auto", display: "inline-block" }}
          type="submit"
          variant="contained"
          color="primary"
        >
          ログイン
        </Button>
      </Box>
      <Link href="/signup">アカウントを新規作成</Link>
    </Box>
  );
};
