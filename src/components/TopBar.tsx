import { Box } from "@mui/material";
import { useRouter } from "next/router";

const TopBar = () => {
  const router = useRouter();
  const getTitle = () => {
    const pathname = router.pathname;
    if (pathname.includes("/orders")) return "Orders";
    if (pathname.includes("/menuCategories")) return "Menu Categories";
    if (pathname.includes("/menus")) return "Menus";
    if (pathname.includes("/addonCategories")) return "addonCategories";
    if (pathname.includes("/addons")) return "Addons";
    if (pathname.includes("/tables")) return "Tables";
    if (pathname.includes("/settings")) return "Settings";
    if (pathname.includes("/locations")) return "Locations";
    return;
  };
  return <div className="bg-indigo-400 py-3 col-span-6">{getTitle()}</div>;
};

export default TopBar;
