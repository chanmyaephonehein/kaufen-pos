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

const ItemCard2 = ({
  icon,
  href,
  title,
  subTitle,
  noti,
  quantity,
  updating,
}: Props) => {
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
        <div className="flex flex-row justify-between w-full">
          <div
            className={
              noti === false
                ? "m-3 bg-green-300 py-1 px-3 rounded-xl"
                : "m-3 bg-blue-300 py-1 px-3 rounded-xl"
            }
          >
            {noti === true ? "reserving" : "unconcern"}
          </div>
          <div
            className={
              quantity === 0
                ? "m-3 pt-1 px-3 bg-green-300 rounded-xl"
                : updating === false
                ? "m-3 pt-1 px-3 bg-blue-300 rounded-xl "
                : "m-3 pt-1 px-3 bg-blue-300 rounded-xl animate-ping"
            }
          >
            {quantity}
          </div>
        </div>

        {icon}
        <Typography>{title}</Typography>
        {subTitle && <Typography>{subTitle}</Typography>}
      </Paper>
    </Link>
  );
};

export default ItemCard2;
