import { configureStore } from "@reduxjs/toolkit";
import { addonCategoriesSlice } from "./slices/addonCategoriesSlice";
import { addonsSlice } from "./slices/addonsSlice";

export const store = configureStore({
  reducer: {
    app: appSlice,
    menuCategories: menuCategoriesSlice,
    menus: menusSlice,
    addonCategoriesSlice: addonCategoriesSlice,
    addonsSlice: addonsSlice,
    cart: cartSlice,
    orders: ordersSlice,
    orderlines: orderlinesSlice,
    locations: locationsSlice,
    company: companySlice,
    tables: tablesSlice,
    menusAddonCategories: menusAddonCategoriesSlice,
    menusMenuCategoriesLocations: menusMenuCategoriesLocationsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
