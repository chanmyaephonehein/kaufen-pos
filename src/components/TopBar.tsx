import { Box, Button } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const TopBar = () => {
  const router = useRouter();
  const { data } = useSession();
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
    if (pathname.includes("/auth/sign")) return "Sign In";
    return;
  };
  return (
    <div>
      <div className="bg-indigo-400 py-3 col-span-6">{getTitle()}</div>
      {data && (
        <Button onClick={() => signOut({ callbackUrl: "/" })}>Logout</Button>
      )}
    </div>
  );
};

export default TopBar;
