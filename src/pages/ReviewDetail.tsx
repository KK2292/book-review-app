import {
  Box,
  Button,
  Container,
  Link,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../api";

export type reviewData = {
  id: string;
  title: string;
  url: string;
  detail: string;
  review: string;
  reviewer: string;
  isMine: boolean;
};

export const ReviewDetail = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [review, setReview] = useState<reviewData>();
  const [isExisting, setIsExisting] = useState(true);

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

  const navigateToEditReview = (id: string | undefined) => {
    if (!id) return;
    navigate(`/edit/${id}`);
  };

  if (isExisting) {
    return (
      <Container sx={{ padding: "32px", maxWidth: "500px" }}>
        {review?.isMine && (
          <Button
            variant="contained"
            sx={{ color: "#fff", marginBottom: "8px" }}
            onClick={() => navigateToEditReview(id)}
          >
            編集
          </Button>
        )}
        <Box
          p={2}
          sx={{
            width: "500px",
            margin: "auto",
            backgroundColor: "#fff",
          }}
        >
          {review ? (
            <Stack spacing={1}>
              <Typography sx={{ fontSize: "32px", color: "#222" }}>
                {review?.title}
              </Typography>
              <Typography sx={{ fontSize: "14px", color: "#222" }}>
                {review?.reviewer} さん
              </Typography>
              <Link
                href={review?.url}
                target="_blank"
                rel="noopener"
                sx={{ fontSize: "14px", color: theme.palette.primary.main }}
              >
                {review?.url}
              </Link>
              <Typography sx={{ fontSize: "14px", color: "#222" }}>
                レビュー:{review?.review}
              </Typography>
              <Typography sx={{ fontSize: "14px", color: "#222" }}>
                詳細:{review?.detail}
              </Typography>
            </Stack>
          ) : (
            <Skeleton variant="rectangular" height={164} />
          )}
        </Box>
      </Container>
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
