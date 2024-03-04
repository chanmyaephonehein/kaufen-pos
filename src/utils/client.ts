import { CartItem } from "@/store/slices/cartSlice";
import {
  AddonCategories,
  Addons,
  Locations,
  Menus,
  MenusAddonCategories,
  MenusMenuCategoriesLocations,
  Orderlines,
  Orders,
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
    .filter(
      (item) => item.menuId && item.locationId === Number(selectedLocationId)
    )
    .map((item) => item.menuId);
  const validAddonCategoryIds = menusAddonCategories
    .filter((item) => validMenuIds.includes(item.menuId as number))
    .map((item) => item.addonCategoryId);
  return addons.filter((item) =>
    validAddonCategoryIds.includes(item.addonCategoryId as number)
  );
};

export const getLocationsByMenuCategoryId = (
  locations: Locations[],
  menuCategoryId: string,
  menusMenuCategoriesLocations: MenusMenuCategoriesLocations[]
) => {
  const validLocationIds = menusMenuCategoriesLocations
    .filter((item) => item.menuCategoryId === Number(menuCategoryId))
    .map((item) => item.locationId);
  return locations.filter((item) => validLocationIds.includes(item.id));
};

export const getMenusByMenuCategoryId = (
  menus: Menus[],
  menuCategoryId: string,
  menusMenuCategoriesLocations: MenusMenuCategoriesLocations[],
  selectedLocationId: string
) => {
  const validMenuIds = menusMenuCategoriesLocations
    .filter(
      (item) =>
        item.menuId &&
        item.menuCategoryId === Number(menuCategoryId) &&
        item.locationId === Number(selectedLocationId)
    )
    .map((item) => item.menuId);
  return menus.filter((item) => validMenuIds.includes(item.id));
};

export const getAddonCategoriesByMenuId = (
  menuId: string,
  menusAddonCategories: MenusAddonCategories[],
  addonCategories: AddonCategories[]
) => {
  const validAddonCategoryIds = menusAddonCategories
    .filter((item) => item.menuId === Number(menuId))
    .map((item) => item.addonCategoryId);
  return addonCategories.filter((item) =>
    validAddonCategoryIds.includes(item.id)
  );
};

export const getAddonsByAddonCategoryId = (
  addonCategoryId: string,
  addons: Addons[]
) => {
  return addons.filter(
    (item) => item.addonCategoryId === Number(addonCategoryId)
  );
};

export const generateRandomId = () =>
  (Math.random() + 1).toString(36).substring(7);

export const getCartTotalPrice = (cart: CartItem[]) => {
  const totalPrice = cart.reduce((prev, curr) => {
    const menuPrice = curr.menu.price;
    const addonPrice = curr.addon.reduce((pre, cur) => (pre += cur.price), 0);
    prev += (menuPrice + addonPrice) * curr.quantity;
    return prev;
  }, 0);
  return totalPrice;
};

export const getActiveOrderPrice = (
  menuId: number,
  quantity: number,
  menus: Menus[],
  addons: Addons[],
  orderlines: Orderlines[],
  orders: Orders[],
  orderId: number
) => {
  const specificOrderlines = orderlines.filter(
    (item) => item.orderId === orderId
  );
  const menuPrice = menus.find((item) => item.id === menuId)?.price as number;
  const addonIds = specificOrderlines
    .filter((item) => item.menuId === menuId)
    .map((i) => i.addonId);
  const addonIdPrice = addons
    .filter((item) => addonIds.includes(item.id))
    .map((i) => i.price);
  let addonPrice = 0;
  addonPrice = addonIdPrice.reduce((prev, curr) => (prev += curr), 0);
  return (menuPrice + addonPrice) * quantity;
};

export const getOrderTotalPrice = (menu: CartItem) => {
  const menuPrice = menu.menu.price;
  const addonPrice = menu.addon.reduce((prev, curr) => (prev += curr.price), 0);
  const totalPrice = (menuPrice + addonPrice) * menu.quantity;
  return totalPrice;
};

export const getQrCodeUrl = (locationId: number, tableId: number) => {
  return `https://msquarefdc.sgp1.cdn.digitaloceanspaces.com/foodie-pos/qrcode/msquare/locationId-${locationId}-tableId-${tableId}.png`;
};
