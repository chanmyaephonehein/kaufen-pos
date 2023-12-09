import AddIcon from "@mui/icons-material/Add";
import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { getAddonsByLocationId, getSelectedLocationId } from "@/utils/client";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import Loading from "@/components/Loading";
import ItemCard from "@/components/ItemCard";
import EggIcon from "@mui/icons-material/Egg";
import NewAddon from "./NewAddon";

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
  console.log(validAddons);
  if (isLoading) return <Loading />;
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
      <div className="flex  flex-wrap">
        {validAddons.map((item) => (
          <ItemCard
            key={item.id}
            href={`/backoffice/addons/${item.id}`}
            icon={<EggIcon sx={{ my: 3, fontSize: 60 }} />}
            title={item.name}
            subTitle={`${item.price} kyats`}
          />
        ))}
      </div>
      <NewAddon open={open} setOpen={setOpen} />
    </div>
  );
};

export default Addons;
