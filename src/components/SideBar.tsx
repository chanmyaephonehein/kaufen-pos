import {
  Box,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";

const SideBar = () => {
  return (
    <Box>
      <List>
        {items.map((item) => {
          return (
            <Link key={item.id} href={item.route}>
              <ListItem>{item.label}</ListItem>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
              </ListItemButton>
            </Link>
          );
        })}
      </List>
    </Box>
  );
};

export const items = [
  { id: 1, label: "Orders", icon: <a />, route: "/backoffice/orders" },
  {
    id: 2,
    label: "MenuCategories",
    icon: <a />,
    route: "/backoffice/menuCategories",
  },
  { id: 3, label: "Menus", icon: <a />, route: "/backoffice/menus" },
  {
    id: 4,
    label: "AddonCategories",
    icon: <a />,
    route: "/backoffice/addonCategories",
  },
  { id: 5, label: "Addons", icon: <a />, route: "/backoffice/addons" },
  { id: 6, label: "Tables", icon: <a />, route: "/backoffice/tables" },
  { id: 7, label: "Locations", icon: <a />, route: "/backoffice/locations" },
  { id: 8, label: "Setting", icon: <a />, route: "/backoffice/setting" },
];

export default SideBar;
