import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { getSelectedLocationId } from "@/utils/client";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Loading from "@/components/Loading";
import NewMenu from "./NewMenu";
import MenuCard from "@/components/MenuCard";

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
      <div className="flex flex-wrap">
        {validMenus.map((item) => (
          <MenuCard
            key={item.id}
            menu={item}
            href={`/backoffice/menus/${item.id}`}
          />
        ))}
      </div>
      <NewMenu open={open} setOpen={setOpen} />
    </div>
  );
};

export default Menus;
