"use client"

import { EditGuide } from "@/features/guide/edit";
import { Stack, Typography } from "@mui/material";

export default function PageContent() {
  return (
    <Stack height='100%'>
        <Typography variant="h3" mb='4rem'>Edit Guide</Typography>
        <EditGuide />
    </Stack>
  );
}
