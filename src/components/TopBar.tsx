import { Box, Button, Divider } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import PetsIcon from "@mui/icons-material/Pets";

const TopBar = ({ location }: { location: string }) => {
  const router = useRouter();
  const { data } = useSession();
  const getTitle = () => {
    const pathname = router.pathname;
    if (pathname.includes("/dashboard")) return "Dashboard";
    if (pathname.includes("/orders")) return "Orders";
    if (pathname.includes("/menuCategories")) return "Menu Categories";
    if (pathname.includes("/menus")) return "Menus";
    if (pathname.includes("/addonCategories")) return "Addon Categories";
    if (pathname.includes("/addons")) return "Addons";
    if (pathname.includes("/tables")) return "Tables";
    if (pathname.includes("/settings")) return "Settings";
    if (pathname.includes("/locations")) return "Locations";
    if (pathname.includes("/auth/sign")) return "Sign In";
    return;
  };
  return (
    <div className="flex flex-col mb-3">
      <div className="flex justify-between items-center">
        <div
          onClick={() => router.push({ pathname: "/backoffice" })}
          className="flex justify-center items-center gap-2 cursor-pointer"
        >
          <PetsIcon style={{ color: "gray", fontSize: "30px" }} />
          <span className="text-xl">Kaufen</span>
        </div>
        <p className="py-2 col-span-6 text-lg font-bold">{getTitle()}</p>{" "}
        <p className="text-gray-500 ">{location}</p>
        {data && (
          <Button
            variant="outlined"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Logout
          </Button>
        )}
      </div>
      <Divider />
    </div>
  );
};

export default TopBar;
