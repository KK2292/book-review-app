import { Box, Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { API_URL } from "../api";
import { typeToast } from "../atoms/Toast";
import { ValidationMessage } from "../atoms/ValidationMessage";
import { userData } from "../types/userData";

export const Profile = (props: {
  userName: string | null;
  setToast: (toast: typeToast) => void;
}) => {
  const { userName, setToast } = props;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<userData>();

  useEffect(() => {
    if (userName) {
      setValue("name", userName);
    }
  }, [userName, setValue]);
  const onSubmit = async (formData: userData) => {
    const storedToken = localStorage.getItem("token");

    await axios
      .put(`${API_URL}/users`, formData, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then(() => {
        setToast({
          open: true,
          message: `名前を「${formData.name}」に変更しました`,
          severity: "success",
        });
      })
      .catch((error) => {
        setToast({
          open: true,
          message: error.response?.data || "名前の変更に失敗しました",
          severity: "error",
        });
      });
  };
  return (
    <Container sx={{ p: 4 }}>
      <Typography
        variant="h2"
        sx={{ textAlign: "center", fontSize: "20px", color: "#222" }}
      >
        ユーザー情報
      </Typography>
      <Box
        sx={{
          width: "500px",
          maxWidth: "100%",
          margin: "80px auto",
          textAlign: "center",
        }}
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          margin="normal"
          fullWidth
          label="名前"
          type="text"
          autoComplete="name"
          autoFocus
          InputLabelProps={{ shrink: !!userName }}
          {...register("name", {
            required: "入力してください",
          })}
          defaultValue={userName}
        />
        {errors.name && (
          <ValidationMessage>{errors.name.message as string}</ValidationMessage>
        )}

        <Button
          sx={{ color: "#fff", margin: "auto", display: "inline-block" }}
          type="submit"
          variant="contained"
          color="primary"
        >
          名前を変更
        </Button>
      </Box>
    </Container>
  );
};
