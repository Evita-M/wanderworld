"use client"
import { EditGuide } from "@/features/guide/edit/ui/edit-guide";
import { Typography } from "@mui/material";


export default function PageContent() {
  return (
    <>
        <Typography variant="h1">Edit Guide</Typography>
        <EditGuide />
    </>
  );
}
