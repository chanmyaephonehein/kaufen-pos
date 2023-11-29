import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { getSelectedLocationId } from "@/utils/client";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Loading from "@/components/Loading";
import ItemCard from "@/components/ItemCard";
import ClassIcon from "@mui/icons-material/Class";
import NewAddonCategory from "./NewAddonCategory";

const AddonCategories = () => {
  const {
    menusMenuCategoriesLocations,
    addonCategories,
    isLoading,
    menusAddonCategories,
    addons,
  } = useAppSelector(appData);
  const [open, setOpen] = useState(false);
  const selectedLocationId = getSelectedLocationId() as string;

  const validMenuIds = menusMenuCategoriesLocations
    .filter((item) => item.locationId === Number(selectedLocationId))
    .map((item) => item.menuId);

  const validAddonCategoryIds = menusAddonCategories
    .filter((item) => validMenuIds.includes(item.menuId))
    .map((item) => item.addonCategoryId);

  const validAddonCategories = addonCategories.filter((item) =>
    validAddonCategoryIds.includes(item.id)
  );

  const getAddonsCount = (addonCategoryId?: number) => {
    if (!addonCategoryId) return 0;
    return addons.filter((item) => item.addonCategoryId === addonCategoryId)
      .length;
  };
  if (isLoading) return <Loading />;
  return (
    <div className="col-span-5">
      <div className="flex justify-end">
        <Button
          onClick={() => setOpen(true)}
          variant="contained"
          startIcon={<AddIcon />}
        >
          New Addon Category
        </Button>
      </div>
      <div className="flex">
        {validAddonCategories.map((item) => (
          <ItemCard
            key={item.id}
            href={`/backoffice/addonCategories/${item.id}`}
            title={item.name}
            icon={<ClassIcon sx={{ my: 3, fontSize: 60 }} />}
            subTitle={`${getAddonsCount(item.id)} addons`}
          />
        ))}
      </div>
      <NewAddonCategory open={open} setOpen={setOpen} />
    </div>
  );
};

export default AddonCategories;
