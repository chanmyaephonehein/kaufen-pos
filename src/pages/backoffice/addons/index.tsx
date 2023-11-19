import AddIcon from "@mui/icons-material/Add";
import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { getAddonsByLocationId, getSelectedLocationId } from "@/utils/client";
import { Box, Button } from "@mui/material";
import { useState } from "react";

const Addons = () => {
  const {
    isLoading,
    menusMenuCategoriesLocations,
    menusAddonCategories,
    addons,
  } = useAppSelector(appData);
  const [open, setOpen] = useState(false);
  const selectedLocationId = getSelectedLocationId() as string;
  const validAddons = getAddonsByLocationId(
    selectedLocationId,
    menusMenuCategoriesLocations,
    menusAddonCategories,
    addons
  );
  return (
    <div className="col-span-5">
      <div className="flex justify-end">
        <Button
          onClick={() => setOpen(true)}
          variant="contained"
          startIcon={<AddIcon />}
        >
          New Addon
        </Button>
      </div>
      <div className="flex">
        {validAddons.map((item) => (
          <div className="flex flex-col m-3 items-center" key={item.id}>
            <span>{item.name}</span>
            <span>{item.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Addons;
