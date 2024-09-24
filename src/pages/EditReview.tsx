import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../api";
import { typeToast } from "../atoms/Toast";
import { ValidationMessage } from "../atoms/ValidationMessage";
import { reviewData } from "./ReviewDetail";

export const EditReview = (props: { setToast: (toast: typeToast) => void }) => {
  const { setToast } = props;
  const { id } = useParams<{ id: string }>();
  const [review, setReview] = useState<reviewData>();
  const [isExisting, setIsExisting] = useState(true);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await axios.get(`${API_URL}/books/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setReview(response.data);
        setIsExisting(true);
      } catch (error) {
        console.error(error);
        setIsExisting(false);
      }
    };

    fetchReview();
  }, [id, isExisting]);

  useEffect(() => {
    if (review) {
      setValue("title", review.title);
      setValue("url", review.url);
      setValue("detail", review.detail);
      setValue("review", review.review);
    }
  }, [review, setReview, setValue]);

  const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
    const storedToken = localStorage.getItem("token");
    await axios
      .put(
        `${API_URL}/books/${id}`,
        { ...formData, id },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      )
      .then(() => {
        setToast({
          open: true,
          message: `レビューを更新しました`,
          severity: "success",
        });
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

  const deleteReview = async (id: string | undefined) => {
    const storedToken = localStorage.getItem("token");
    await axios
      .delete(`${API_URL}/books/${id}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then(() => {
        setToast({
          open: true,
          message: `レビューを削除しました`,
          severity: "success",
        });
        navigate("/");
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

  if (isExisting) {
    return (
      <Box p={4} sx={{ textAlign: "center" }}>
        <Typography
          variant="h2"
          sx={{
            fontSize: "20px",
            color: "#222",
          }}
        >
          レビューを更新
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
            InputLabelProps={{ shrink: !!review?.title }}
            {...register("title", {
              required: "必須項目です",
            })}
            defaultValue={review?.title}
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
            InputLabelProps={{ shrink: !!review?.url }}
            {...register("url", {
              required: "必須項目です",
            })}
            defaultValue={review?.url}
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
            InputLabelProps={{ shrink: !!review?.detail }}
            {...register("detail", {
              required: "必須項目です",
            })}
            defaultValue={review?.detail}
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
            InputLabelProps={{ shrink: !!review?.review }}
            {...register("review", {
              required: "必須項目です",
            })}
            defaultValue={review?.review}
          />
          {errors.review && (
            <ValidationMessage>
              {errors.review.message as string}
            </ValidationMessage>
          )}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              sx={{ color: "#fff", display: "inline-block" }}
              variant="contained"
              color="secondary"
              onClick={() => {
                deleteReview(id);
              }}
            >
              削除
            </Button>
            <Button
              sx={{ color: "#fff", display: "inline-block" }}
              type="submit"
              variant="contained"
              color="primary"
            >
              登録
            </Button>
          </Box>
        </Box>
      </Box>
    );
  } else {
    return (
      <Box
        p={2}
        sx={{
          width: "500px",
          margin: "80px auto",
          backgroundColor: "#fff",
        }}
      >
        <Typography sx={{ fontSize: "32px", color: "#222" }}>
          レビューが存在しません
        </Typography>
      </Box>
    );
  }
};
