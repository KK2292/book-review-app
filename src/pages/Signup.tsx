import styled from "@emotion/styled";
import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../api";
import { typeToast } from "../atoms/Toast";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Compressor from "compressorjs";

type SignupProps = {
  setToast: (toast: typeToast) => void;
};

type userData = {
  name: string;
  email: string;
  password: string;
};

export const Signup = (props: SignupProps) => {
  const { setToast } = props;
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userData>();

  const onSubmit = async (formData: userData) => {
    try {
      const userResponse = await axios.post(`${API_URL}/users`, formData);
      const token = userResponse.data.token;

      if (previewImage) {
        const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB
        if (previewImage.size > MAX_FILE_SIZE) {
          return;
        }
        const uploadImage = new FormData();
        uploadImage.append("icon", previewImage);

        try {
          await axios.post(`${API_URL}/uploads`, uploadImage, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } catch (error) {
          if (axios.isAxiosError(error)) {
            setToast({
              open: true,
              message: error.response?.data || "アップロードに失敗しました",
              severity: "error",
            });
            return;
          }
        }
        setToast({
          open: true,
          message: "登録が完了しました",
          severity: "success",
        });
      }
      navigate("/");
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

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const images = e.target.files;
    if (images === null) return;
    const image = images[0];

    const validTypes = ["image/jpeg", "image/png"];
    if (!validTypes.includes(image.type)) {
      setToast({
        open: true,
        message: "pngまたはjpg形式のファイルを選択してください",
        severity: "error",
      });
      return;
    }

    const maxSizeInBytes = 1024 * 1024;

    new Compressor(image, {
      convertSize: maxSizeInBytes,
      success(result) {
        setPreviewImage(result as File);
      },
      error(err) {
        console.log(err.message);
      },
    });
  };

  const ValidationMessage = styled.p`
    color: rgb(211, 47, 47);
    font-size: 14px;
    margin: 0 0 16px;
    text-align: left;
  `;

  return (
    <>
      <Box sx={{ textAlign: "center" }}>
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
            label="名前"
            id="name"
            type="name"
            autoComplete="name"
            autoFocus
            {...register("name", {
              required: "必須項目です",
            })}
          />
          {errors.name && (
            <ValidationMessage>
              {errors.name.message as string}
            </ValidationMessage>
          )}
          <TextField
            margin="normal"
            fullWidth
            label="メールアドレス"
            id="email"
            type="email"
            autoComplete="email"
            {...register("email", {
              required: "必須項目です",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+$/,
                message: "メールアドレスの形式が正しくありません",
              },
            })}
          />
          {errors.email && (
            <ValidationMessage>
              {errors.email.message as string}
            </ValidationMessage>
          )}
          <TextField
            margin="normal"
            fullWidth
            label="パスワード"
            id="password"
            type="password"
            autoComplete="password"
            {...register("password", {
              required: "必須項目です",
              pattern: {
                value: /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/,
                message: "英数字を含む8文字以上のパスワードを指定してください",
              },
            })}
          />
          {errors.password && (
            <ValidationMessage>
              {errors.password.message as string}
            </ValidationMessage>
          )}
          <Box
            component="img"
            sx={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              border: "2px solid #ccc",
              objectFit: "cover",
            }}
            alt="icon"
            src={
              previewImage ? URL.createObjectURL(previewImage) : "default.jpg"
            }
          />
          <Button
            sx={{
              color: "#fff",
              margin: "20px auto 20px 0",
              display: "inline-block",
            }}
            variant="contained"
            color="primary"
            component="label"
          >
            アイコン画像を設定
            <input
              type="file"
              hidden
              onChange={(e) => {
                onImageChange(e);
              }}
            />
          </Button>

          <Button
            sx={{ color: "#fff", margin: "auto", display: "inline-block" }}
            type="submit"
            variant="contained"
            color="primary"
          >
            登録
          </Button>
        </Box>
        <Link to="/login">既にアカウントをお持ちの方はこちら</Link>
      </Box>
    </>
  );
};
