import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { getSelectedLocationId } from "@/utils/client";
import { Paper, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  href: string;
  title: string;
  subTitle?: string;
  noti?: boolean;
  quantity?: number;
  updating?: boolean;
}

const ItemCard = ({ icon, href, title, subTitle }: Props) => {
  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <Paper
        sx={{
          m: 2,
          width: 200,
          height: 200,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {icon}
        <Typography>{title}</Typography>
        {subTitle && <Typography>{subTitle}</Typography>}
      </Paper>
    </Link>
  );
};

export default ItemCard;
