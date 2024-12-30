import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Link from "next/link";
import CategoryIcon from "@mui/icons-material/Category";
import ClassIcon from "@mui/icons-material/Class";
import EggIcon from "@mui/icons-material/Egg";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SettingsIcon from "@mui/icons-material/Settings";
import TableBarIcon from "@mui/icons-material/TableBar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const SideBar = () => {
  const [selected, setSelected] = useState<number>();
  const router = useRouter();
  useEffect(() => {
    if (!selected) {
      const route = router.pathname;
      const id = items.find((item) => item.route === route)?.id;
      if (id) {
        setSelected(id);
      }
    }
  }, []);

  return (
    <div className="col-span-1">
      <List>
        {items.map((item) => (
          <Link
            key={item.id}
            href={item.route}
            style={{ textDecoration: "none" }}
            onClick={() => setSelected(item.id)}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} style={{ color: "gray" }} />
              </ListItemButton>
              <div
                className={selected === item.id ? "w-1 h-10 bg-blue-800" : ""}
              />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );
};

export const items = [
  {
    id: 0,
    label: "Dashboard",
    icon: <DashboardIcon />,
    route: "/backoffice/dashboard",
  },
  {
    id: 1,
    label: "Orders",
    icon: <LocalMallIcon />,
    route: "/backoffice/orders",
  },
  {
    id: 2,
    label: "MenuCategories",
    icon: <CategoryIcon />,
    route: "/backoffice/menuCategories",
  },
  {
    id: 3,
    label: "Menus",
    icon: <LocalDiningIcon />,
    route: "/backoffice/menus",
  },
  {
    id: 4,
    label: "AddonCategories",
    icon: <ClassIcon />,
    route: "/backoffice/addonCategories",
  },
  { id: 5, label: "Addons", icon: <EggIcon />, route: "/backoffice/addons" },
  {
    id: 6,
    label: "Tables",
    icon: <TableBarIcon />,
    route: "/backoffice/tables",
  },
  {
    id: 7,
    label: "Locations",
    icon: <LocationOnIcon />,
    route: "/backoffice/locations",
  },
  {
    id: 8,
    label: "Settings",
    icon: <SettingsIcon />,
    route: "/backoffice/settings",
  },
];

export default SideBar;
