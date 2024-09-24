import { Box, Stack, Typography } from "@mui/material";
import { reviewData } from "../types/reviewData";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../api";

export const ReviewList = (props: { reviewData: reviewData[] }) => {
  const { reviewData } = props;
  const navigate = useNavigate();
  const submitLog = (id: string) => {
    axios
      .post(
        `${API_URL}/logs`,
        {
          selectBookId: id,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((response) => {
        console.log(response);
      });
  };
  const navigateToDetail = (id: string) => {
    navigate(`/detail/${id}`);
    submitLog(id);
  };
  return (
    <Box>
      {reviewData.map((data: reviewData) => {
        return (
          <Box
            key={data.id}
            sx={{
              width: "100%",
              maxWidth: "480px",
              margin: "auto",
              backgroundColor: "#eee",
              padding: "16px",
              border: "1px solid #ccc",
              borderBottom: "none",
              transition: "0.2s",
              ":hover": {
                backgroundColor: "#ddd",
              },
              ":last-child": {
                borderBottom: "1px solid #ccc",
              },
            }}
            onClick={() => navigateToDetail(data.id)}
          >
            <Stack spacing={1}>
              <Typography
                variant="h3"
                sx={{
                  fontSize: "24px",
                  color: "#000",
                  textAlign: "left",
                }}
              >
                {data.title}
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontSize: "14px",
                  color: "#222",
                  textAlign: "left",
                }}
              >
                {data.review}
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#222",
                  textAlign: "left",
                }}
              >
                {data.reviewer}
              </Typography>
            </Stack>
          </Box>
        );
      })}
    </Box>
  );
};
