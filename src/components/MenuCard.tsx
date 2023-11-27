import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Menus } from "@prisma/client";
import Link from "next/link";
import PaidIcon from "@mui/icons-material/Paid";

interface Props {
  menu: Menus;
  href: string | object;
}

const MenuCard = ({ menu, href }: Props) => {
  return (
    <Link href={href} key={menu.id} style={{ textDecoration: "none" }}>
      <Card sx={{ width: 200, height: 220, m: 2 }}>
        <CardMedia sx={{ height: 140 }} />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography>{menu.name}</Typography>
          <Box sx={{ display: "flex" }}>
            <PaidIcon />
            <Typography>{menu.price}</Typography>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MenuCard;
