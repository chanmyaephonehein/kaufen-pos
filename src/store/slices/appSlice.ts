import { config } from "@/config";
import {
  PayloadAction,
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { setMenuCategories } from "./menuCategoriesSlice";
import { setMenus } from "./menusSlice";
import { setAddonCategories } from "./addonCategoriesSlice";
import { setAddons } from "./addonsSlice";
import { setMenusAddonCategories } from "./menusAddonCategoriesSlice";
import { setLocations } from "./locationsSlice";
import { setMenusMenuCategoriesLocations } from "./menusMenuCategoriesLocationsSlice";
import { setTables } from "./tablesSlice";
import { setCompany } from "./companySlice";
import { setOrders } from "./ordersSlice";
import { setOrderlines } from "./orderlinesSlice";
import { RootState } from "..";
import { getSelectedLocationId } from "@/utils/client";

interface AppState {
  isLoading: boolean;
  init: boolean;
  error: Error | null;
}

interface fetchAppDataPayload {
  locationId?: string;
  tableId?: string;
}

const initialState: AppState = {
  isLoading: false,
  init: false,
  error: null,
};

export const fetchAppData = createAsyncThunk(
  "app/fetchAppData",
  async (payload: fetchAppDataPayload, thunkAPI) => {
    thunkAPI.dispatch(setAppLoading(true));
    const selectedLocationId = getSelectedLocationId();
    const response = await fetch(
      `${config.apiBaseUrl}/app?locationId=${payload.locationId}&tableId=${payload.tableId}`
    );
    const responseJson = await response.json();
    const {
      menuCategories,
      menus,
      addonCategories,
      addons,
      menusAddonCategories,
      locations,
      menusMenuCategoriesLocations,
      tables,
      company,
      orders,
      orderlines,
    } = responseJson;

    thunkAPI.dispatch(setMenuCategories(menuCategories));
    thunkAPI.dispatch(setMenus(menus));
    thunkAPI.dispatch(setAddonCategories(addonCategories));
    thunkAPI.dispatch(setAddons(addons));
    thunkAPI.dispatch(setMenusAddonCategories(menusAddonCategories));
    thunkAPI.dispatch(setLocations(locations));
    thunkAPI.dispatch(
      setMenusMenuCategoriesLocations(menusMenuCategoriesLocations)
    );
    thunkAPI.dispatch(setTables(tables));
    thunkAPI.dispatch(setCompany(company));
    thunkAPI.dispatch(setOrders(orders));
    thunkAPI.dispatch(setOrderlines(orderlines));
    thunkAPI.dispatch(setAppLoading(false));
    if (selectedLocationId) {
      localStorage.setItem("selectedLocationId", selectedLocationId);
    } else {
      localStorage.setItem("selectedLocationId", String(locations[0].id));
    }
    thunkAPI.dispatch(setInit(true));
  }
);

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setInit: (state, action: PayloadAction<boolean>) => {
      state.init = action.payload;
    },
    setAppLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setAppLoading, setInit } = appSlice.actions;

export const selectApp = (state: RootState) => state.app;
export const selectMenuCategories = (state: RootState) =>
  state.menuCategories.items;
export const selectMenus = (state: RootState) => state.menus.items;
export const selectAddonCategories = (state: RootState) =>
  state.addonCategories.items;
export const selectAddons = (state: RootState) => state.addons.items;
export const selectMenusAddonCategories = (state: RootState) =>
  state.menusAddonCategories.items;
export const selectLocations = (state: RootState) => state.locations.items;
export const selectMenusMenuCategoriesLocations = (state: RootState) =>
  state.menusMenuCategoriesLocations.items;
export const selectTables = (state: RootState) => state.tables.items;
export const selectCompany = (state: RootState) => state.company.items;
export const selectOrders = (state: RootState) => state.orders.items;
export const selectOrderlines = (state: RootState) => state.orderlines.items;

export const appData = createSelector(
  [
    selectApp,
    selectAddonCategories,
    selectAddons,
    selectCompany,
    selectLocations,
    selectMenuCategories,
    selectMenus,
    selectMenusAddonCategories,
    selectMenusMenuCategoriesLocations,
    selectOrderlines,
    selectOrders,
    selectTables,
  ],
  (
    app,
    addonCategories,
    addons,
    company,
    locations,
    menuCategories,
    menus,
    menusAddonCategories,
    menusMenuCategoriesLocations,
    orderlines,
    orders,
    tables
  ) => {
    return {
      isLoading: app.isLoading,
      menuCategories,
      menus,
      addonCategories,
      addons,
      menusAddonCategories,
      locations,
      menusMenuCategoriesLocations,
      company,
      orderlines,
      orders,
      tables,
    };
  }
);

export default appSlice.reducer;
