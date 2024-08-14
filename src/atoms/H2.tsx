import { Typography } from "@mui/material";

interface H2Props {
  children: React.ReactNode;
}

export const H2: React.FC<H2Props> = ({ children }) => {
  return (
    <Typography variant="h2" sx={{ fontSize: "20px" }}>
      {children}
    </Typography>
  );
};
