import { Box, Button, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../api";
import { ReviewList } from "../molecules/ReviewList";
import { Pagenation } from "../molecules/Pagenation";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  const [reviewData, setReviewData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/public/books?offset=${currentPage * 10}`
        );
        if (response.data.length === 0) {
          setCurrentPage(currentPage - 1);
          return;
        }
        setReviewData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [currentPage]);

  const navigateToRegisterReview = () => {
    navigate("/new");
  };

  return (
    <>
      <Box sx={{ textAlign: "center", p: 4 }}>
        <Stack spacing={2} sx={{ display: "block" }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: "20px",
              color: "#222",
            }}
          >
            レビュー一覧
          </Typography>
          <Button
            variant="contained"
            sx={{ color: "#fff" }}
            onClick={navigateToRegisterReview}
          >
            レビュー登録
          </Button>
          <ReviewList reviewData={reviewData} />
          <Pagenation
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </Stack>
      </Box>
    </>
  );
};
