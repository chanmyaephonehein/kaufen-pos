import Layout from "@/components/Layout";
import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { getSelectedLocationId } from "@/utils/client";
import { Box } from "@mui/material";
import { useState } from "react";

const AddonCategories = () => {
  const {
    menusMenuCategoriesLocations,
    addonCategories,
    isLoading,
    menusAddonCategories,
    addons,
  } = useAppSelector(appData);
  const [open, setOpen] = useState(false);
  const locationId = getSelectedLocationId() as string;

  const validMenuIds = menusMenuCategoriesLocations
    .filter((item) => item.locationId === Number(locationId))
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
  return (
    <div className="col-span-5">
      <div className="flex">
        {validAddonCategories.map((item) => (
          <div className="flex flex-col items-center m-3" key={item.id}>
            <span>{item.name}</span>
            <span>{getAddonsCount(item.id)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddonCategories;
