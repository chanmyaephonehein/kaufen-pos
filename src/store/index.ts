import { configureStore } from "@reduxjs/toolkit";
import menuCategoriesSlice from "./slices/menuCategoriesSlice";
import menusSlice from "./slices/menusSlice";
import menusMenuCategoriesLocationsSlice from "./slices/menusMenuCategoriesLocationsSlice";
import menusAddonCategoriesSlice from "./slices/menusAddonCategoriesSlice";
import tablesSlice from "./slices/tablesSlice";
import companySlice from "./slices/companySlice";
import locationsSlice from "./slices/locationsSlice";
import orderlinesSlice from "./slices/orderlinesSlice";
import ordersSlice from "./slices/ordersSlice";
import cartSlice from "./slices/cartSlice";
import addonCategoriesSlice from "./slices/addonCategoriesSlice";
import addonsSlice from "./slices/addonsSlice";
import appSlice from "./slices/appSlice";
import dataStatisticsSlice from "./slices/dataStatisticsSlice";

export const store = configureStore({
  reducer: {
    app: appSlice,
    menuCategories: menuCategoriesSlice,
    menus: menusSlice,
    addonCategories: addonCategoriesSlice,
    addons: addonsSlice,
    cart: cartSlice,
    orders: ordersSlice,
    orderlines: orderlinesSlice,
    locations: locationsSlice,
    company: companySlice,
    tables: tablesSlice,
    menusAddonCategories: menusAddonCategoriesSlice,
    menusMenuCategoriesLocations: menusMenuCategoriesLocationsSlice,
    dataStatistics: dataStatisticsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
