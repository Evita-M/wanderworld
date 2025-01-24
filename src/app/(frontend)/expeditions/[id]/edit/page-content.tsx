"use client"
import { EditExpedition } from "@/features/expedition/edit/ui/edit-expedition";
import { useParams } from "next/navigation";
import { useGetExpeditionQuery } from "@/entities/expedition/api";
import { Typography } from "@mui/material";
import { Loader } from "@/shared/ui/core/loader";

export default function PageContent() {
  const { id } = useParams();
  const { data: expedition, isLoading } = useGetExpeditionQuery(id as string);

  if (!expedition && !isLoading) throw new Error('Expedition not found');

  return (
    <>{isLoading ? <Loader/> :
	  <>
		<Typography variant="h1">Edit Expedition</Typography>
		<EditExpedition expedition={expedition} isEdit/>
	 </>}
    </>
  );
}
