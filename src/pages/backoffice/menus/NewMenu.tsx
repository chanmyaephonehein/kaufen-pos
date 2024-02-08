import { config } from "@/config";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { fetchMenusMenuCategoriesLocations } from "@/store/slices/menusMenuCategoriesLocationsSlice";
import { addMenu } from "@/store/slices/menusSlice";
import { fetchOrderlines } from "@/store/slices/orderlinesSlice";
import { getSelectedLocationId } from "@/utils/client";
import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const NewMenu = ({ open, setOpen }: Props) => {
  const dispatch = useAppDispatch();
  const { menuCategories, menusMenuCategoriesLocations } =
    useAppSelector(appData);
  const selectedLocationId = getSelectedLocationId() as string;
  const [newMenu, setNewMenu] = useState({
    name: "",
    price: 0,
    menuCategoryIds: [] as number[],
    locationId: Number(selectedLocationId),
    isAvailable: true,
  });
  const validMenuCategoryIds = menusMenuCategoriesLocations
    .filter((item) => item.locationId === Number(selectedLocationId))
    .map((item) => item.menuCategoryId);
  const validMenuCategories = menuCategories.filter(
    (item) => item.id && validMenuCategoryIds.includes(item.id)
  );

  const createMenu = async () => {
    const isValid =
      newMenu.name &&
      newMenu.price &&
      newMenu.menuCategoryIds &&
      newMenu.locationId;
    if (!isValid) return alert("Fill the blank");
    const response = await fetch(`${config.apiBaseUrl}/menus`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMenu),
    });
    const menuCreated = await response.json();
    dispatch(addMenu(menuCreated[0]));
    dispatch(fetchMenusMenuCategoriesLocations(selectedLocationId));
    dispatch(fetchOrderlines("ok"));
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Create a menu</DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TextField
          sx={{ mb: 2, mt: 1 }}
          variant="outlined"
          label="Name"
          onChange={(e) => {
            setNewMenu({ ...newMenu, name: e.target.value });
          }}
        />
        <TextField
          sx={{ mb: 2 }}
          variant="outlined"
          type="number"
          label="Price"
          onChange={(e) => {
            setNewMenu({ ...newMenu, price: Number(e.target.value) });
          }}
        />
        <FormControl sx={{ mb: 2 }}>
          <InputLabel>Menu Categories</InputLabel>
          <Select
            label="Menu Categories"
            value={newMenu.menuCategoryIds as number[]}
            multiple
            onChange={(e) => {
              const values = e.target.value as number[];
              setNewMenu({ ...newMenu, menuCategoryIds: values });
            }}
            renderValue={(value) => {
              const selectedMenuCategories = menuCategories
                .filter((item) =>
                  newMenu.menuCategoryIds.find((i) => i === item.id)
                )
                .map((item) => item.name)
                .join(",");
              return selectedMenuCategories;
            }}
          >
            {validMenuCategories.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                <Checkbox
                  checked={
                    item.id && newMenu.menuCategoryIds.includes(item.id)
                      ? true
                      : false
                  }
                />
                <ListItemText primary={item.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          onClick={createMenu}
          variant="contained"
          sx={{ display: "flex", alignSelf: "flex-end", width: "fit-content" }}
        >
          Create
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default NewMenu;
