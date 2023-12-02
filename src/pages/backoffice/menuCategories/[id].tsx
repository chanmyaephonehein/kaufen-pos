import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import {
  getLocationsByMenuCategoryId,
  getMenusByMenuCategoryId,
  getSelectedLocationId,
} from "@/utils/client";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  TextField,
  Typography,
} from "@mui/material";
import { Locations, MenuCategories, Menus } from "@prisma/client";
import { useRouter } from "next/router";
import { useState } from "react";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import MenuCard from "@/components/MenuCard";
import { config } from "@/config";
import { updateMenuCategory } from "@/store/slices/menuCategoriesSlice";
import { fetchMenusMenuCategoriesLocations } from "@/store/slices/menusMenuCategoriesLocationsSlice";

const EditMenuCategory = () => {
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const {
    menuCategories,
    menus,
    menusMenuCategoriesLocations,
    isLoading,
    locations,
  } = useAppSelector(appData);

  const selectedLocationId = getSelectedLocationId() as string;
  const router = useRouter();
  const menuCategoryId = router.query.id as string;
  const dispatch = useAppDispatch();
  const menuCategory = menuCategories.find(
    (item) => item.id === Number(menuCategoryId)
  ) as MenuCategories;

  const [updatedMenuCategory, setUpdatedMenuCategory] = useState(
    menuCategory?.name as string
  );
  const validLocations = getLocationsByMenuCategoryId(
    locations,
    menuCategoryId,
    menusMenuCategoriesLocations
  );

  const validMenus = getMenusByMenuCategoryId(
    menus,
    menuCategoryId,
    menusMenuCategoriesLocations,
    selectedLocationId
  );
  const validMenuIds = validMenus.map((item) => item.id);

  const [selectedLocation, setSelectedLocation] =
    useState<Locations[]>(validLocations);

  const [selectedMenu, setSelectedMenu] = useState<Menus>();

  const handleUpdateMenuCategory = async () => {
    const response = await fetch(`${config.apiBaseUrl}/menuCategories`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: menuCategoryId,
        name: updatedMenuCategory,
        locationIds: selectedLocation.map((item) => item.id),
      }),
    });
    const menuCategoryUpdated = await response.json();
    dispatch(updateMenuCategory(menuCategoryUpdated));
    dispatch(fetchMenusMenuCategoriesLocations(selectedLocationId));
    router.push({ pathname: "/backoffice/menuCategories" });
  };

  const handleAddMenu = async () => {
    await fetch(`${config.apiBaseUrl}/menuCategories/addMenu`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        menuCategoryId,
        locationId: selectedLocationId,
        menuId: selectedMenu && selectedMenu.id,
      }),
    });
    dispatch(fetchMenusMenuCategoriesLocations(selectedLocationId));
    setSelectedMenu(undefined);
  };

  const handleRemoveMenu = async (menu: Menus) => {
    await fetch(`${config.apiBaseUrl}/menuCategories/removeMenu`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        menuCategoryId,
        menuId: menu.id,
        locationId: selectedLocationId,
      }),
    });
    dispatch(fetchMenusMenuCategoriesLocations(selectedLocationId));
  };
  return (
    <div>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h5">Menu Category</Typography>
        <TextField
          value={updatedMenuCategory}
          onChange={(e) => setUpdatedMenuCategory(e.target.value)}
        />

        <Autocomplete
          multiple
          disableCloseOnSelect
          value={selectedLocation}
          onChange={(e, values) => setSelectedLocation(values)}
          options={locations}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          getOptionLabel={(option) => option.name}
          renderOption={(props, options, { selected }) => (
            <li {...props}>
              <Checkbox
                checkedIcon={checkedIcon}
                icon={icon}
                checked={selected}
                style={{ marginRight: 8 }}
              />
              {options.name}
            </li>
          )}
          sx={{ width: 300, mt: 3 }}
          renderInput={(params) => <TextField {...params} label="Locations" />}
        />
        <Button
          onClick={handleUpdateMenuCategory}
          variant="contained"
          sx={{ width: "fit-content", mt: 2 }}
        >
          Update
        </Button>
        <Typography variant="h4" sx={{ mt: 4 }}>
          Menus
        </Typography>
        <Autocomplete
          sx={{ minWidth: 300, mr: 3 }}
          value={selectedMenu}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          getOptionLabel={(option) => option.name}
          onChange={(evt, value) => {
            if (value) setSelectedMenu(value);
          }}
          clearOnBlur
          options={menus.filter((item) => !validMenuIds.includes(item.id))}
          renderInput={(params) => (
            <TextField {...params} label="Add menu to this category" />
          )}
        />
        <Button
          onClick={handleAddMenu}
          variant="contained"
          sx={{ width: "fit-content", mt: 2 }}
        >
          Add
        </Button>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {validMenus.map((item) => (
            <Box
              key={item.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <MenuCard menu={item} href={`/backoffice/menus/${item.id}`} />
              <Button
                onClick={() => handleRemoveMenu(item)}
                startIcon={<DeleteIcon />}
                variant="contained"
                color="error"
                sx={{ width: "fit-content" }}
              >
                Delete
              </Button>
            </Box>
          ))}
        </Box>
      </Box>
    </div>
  );
};

export default EditMenuCategory;
