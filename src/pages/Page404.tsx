import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const Page404: React.FC = () => {
  return (
    <>
      <Typography variant="h1">404 Not Found</Typography>
      <Link to="/">ホームに戻る</Link>
    </>
  );
};
