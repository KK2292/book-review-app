import { Typography } from "@mui/material";

interface PageTitleProps {
  children: React.ReactNode;
}

export const PageTitle: React.FC<PageTitleProps> = ({ children }) => {
  return (
    <Typography variant="h2" sx={{ fontSize: "20px" }}>
      {children}
    </Typography>
  );
};
