import {
  Addons,
  MenusAddonCategories,
  MenusMenuCategoriesLocations,
} from "@prisma/client";

export const getSelectedLocationId = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("selectedLocationId");
  }
  return "";
};

export const getAddonsByLocationId = (
  selectedLocationId: string,
  menusMenuCategoriesLocations: MenusMenuCategoriesLocations[],
  menusAddonCategories: MenusAddonCategories[],
  addons: Addons[]
) => {
  const validMenuIds = menusMenuCategoriesLocations
    .filter((item) => item.locationId === Number(selectedLocationId))
    .map((item) => item.menuId);
  const validAddonCategoryIds = menusAddonCategories
    .filter((item) => validMenuIds.includes(item.menuId as number))
    .map((item) => item.addonCategoryId);
  return addons.filter((item) =>
    validAddonCategoryIds.includes(item.addonCategoryId as number)
  );
};
