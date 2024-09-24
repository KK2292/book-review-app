import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { ValidationMessage } from "../atoms/ValidationMessage";
import axios from "axios";
import { API_URL } from "../api";
import { typeToast } from "../atoms/Toast";
type reviewData = {
  title: string;
  url: string;
  detail: string;
  review: string;
};

export const RegisterReview = (props: {
  setToast: (toast: typeToast) => void;
}) => {
  const { setToast } = props;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<reviewData>();

  const onSubmit = async (formData: reviewData) => {
    const storedToken = localStorage.getItem("token");
    await axios
      .post(`${API_URL}/books`, formData, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then(() => {
        setToast({
          open: true,
          message: `レビューを登録しました`,
          severity: "success",
        });
        reset();
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          setToast({
            open: true,
            message: error.response?.data.ErrorMessageJP,
            severity: "error",
          });
        }
      });
  };
  return (
    <>
      <Box p={4} sx={{ textAlign: "center" }}>
        <Typography
          variant="h2"
          sx={{
            fontSize: "20px",
            color: "#222",
          }}
        >
          レビューを登録
        </Typography>
        <Box
          sx={{
            width: "500px",
            maxWidth: "100%",
            margin: "20px auto",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
          }}
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            margin="normal"
            fullWidth
            label="タイトル"
            autoFocus
            {...register("title", {
              required: "必須項目です",
            })}
          />
          {errors.title && (
            <ValidationMessage>
              {errors.title.message as string}
            </ValidationMessage>
          )}
          <TextField
            margin="normal"
            fullWidth
            label="URL"
            {...register("url", {
              required: "必須項目です",
            })}
          />
          {errors.url && (
            <ValidationMessage>
              {errors.url.message as string}
            </ValidationMessage>
          )}
          <TextField
            margin="normal"
            fullWidth
            label="詳細"
            id="password"
            {...register("detail", {
              required: "必須項目です",
            })}
          />
          {errors.detail && (
            <ValidationMessage>
              {errors.detail.message as string}
            </ValidationMessage>
          )}
          <TextField
            margin="normal"
            fullWidth
            label="レビュー"
            autoComplete="password"
            {...register("review", {
              required: "必須項目です",
            })}
          />
          {errors.review && (
            <ValidationMessage>
              {errors.review.message as string}
            </ValidationMessage>
          )}

          <Button
            sx={{ color: "#fff", margin: "auto", display: "inline-block" }}
            type="submit"
            variant="contained"
            color="primary"
          >
            登録
          </Button>
        </Box>
      </Box>
    </>
  );
};
