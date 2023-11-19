import Layout from "@/components/Layout";
import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { getSelectedLocationId } from "@/utils/client";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Loading from "@/components/Loading";

const Menus = () => {
  const { menusMenuCategoriesLocations, menus, isLoading } =
    useAppSelector(appData);
  const [open, setOpen] = useState(false);
  const selectedLoactionId = getSelectedLocationId() as string;
  const validMenuIds = menusMenuCategoriesLocations
    .filter((item) => item.locationId === Number(selectedLoactionId))
    .map((item) => item.menuId);

  const validMenus = menus.filter(
    (item) => item.id && validMenuIds.includes(item.id)
  );

  if (isLoading) return <Loading />;
  return (
    <div className="col-span-5">
      <div className="flex justify-end">
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
        >
          New Menu
        </Button>
      </div>
      <div className="flex">
        {menus.map((item) => (
          <div className="flex flex-col m-3 items-center" key={item.id}>
            <span>{item.name}</span>
            <span>{item.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menus;
