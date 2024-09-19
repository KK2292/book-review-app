import { Box, Stack, Typography } from "@mui/material";
import { reviewData } from "../types/reviewData";

export const ReviewList = (props: { reviewData: reviewData[] }) => { 
    const { reviewData} = props;
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
                transtion: "0.3s",
                ":hover": {
                  opacity: 0.7,
                },
                ":last-child": {
                  borderBottom: "1px solid #ccc",
                },
              }}
            >
              <Stack
               spacing={1}>
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
}