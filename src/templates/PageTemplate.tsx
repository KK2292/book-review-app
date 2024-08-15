import { Container, Stack } from "@mui/material";
import React from "react";

interface PageTemplateProps {
  children: React.ReactNode;
}

export const PageTemplate: React.FC<PageTemplateProps> = ({ children }) => {
  return (
    <Container
      sx={{
        textAlign: "center",
        maxWidth: "1080px",
        paddingY: 5,
        paddingX: { xs: 3, sm: 8, md: 8, lg: 10, xl: 15 },
      }}
    >
      <Stack spacing={8} sx={{ alignItems: "center" }}>
        {children}
      </Stack>
    </Container>
  );
};
