import { Container, Stack } from "@mui/material";
import React from "react";

interface PageTemplateProps {
  children: React.ReactNode;
}

export const PageTemplate: React.FC<PageTemplateProps> = ({ children }) => {
  return (
    <Container
      sx={{ textAlign: "center", maxWidth: "1080px", paddingY: "30px" }}
    >
      <Stack spacing={5} sx={{ alignItems: "center" }}>
        {children}
      </Stack>
    </Container>
  );
};
