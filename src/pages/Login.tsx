import { Box, Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { userData } from "../types/userData";
import { useForm } from "react-hook-form";
import axios from "axios";
import { API_URL } from "../api";
import { typeToast } from "../atoms/Toast";
import { ValidationMessage } from "../atoms/ValidationMessage";

type LoginProps = {
  setToast: (toast: typeToast) => void;
};

export const Login = (props: LoginProps) => {
  const { setToast } = props;
  const navigate = useNavigate();
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
      if (tokenResponsed) {
        setToast({
          open: true,
          message: "ログインしました",
          severity: "success",
        });
        navigate("/");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setToast({
          open: true,
          message: error.response?.data.ErrorMessageJP,
          severity: "error",
        });
      }
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
      <Link to="/signup">アカウントを新規作成</Link>
    </Box>
  );
};
