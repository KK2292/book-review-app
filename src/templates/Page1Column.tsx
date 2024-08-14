import { Stack } from "@mui/material";
import React from "react";

interface Page1ColumnProps {
  children: React.ReactNode;
}

export const Page1Column: React.FC<Page1ColumnProps> = ({ children }) => {
  return (
    <Stack spacing={5} sx={{ width: "100%", maxWidth: "500px" }}>
      {children}
    </Stack>
  );
};
