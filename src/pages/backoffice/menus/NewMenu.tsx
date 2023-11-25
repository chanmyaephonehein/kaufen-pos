import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
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
  const { menuCategories, menusMenuCategoriesLocations } =
    useAppSelector(appData);

  const [newMenu, setNewMenu] = useState({
    name: "",
    price: 0,
    description: "",
    menuCategories: [] as number[],
  });
  const selectedLocationId = getSelectedLocationId() as string;
  const validMenuCategoryIds = menusMenuCategoriesLocations
    .filter((item) => item.locationId === Number(selectedLocationId))
    .map((item) => item.menuCategoryId);
  const validMenuCategories = menuCategories.filter(
    (item) => item.id && validMenuCategoryIds.includes(item.id)
  );

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
        <TextField
          sx={{ mb: 2 }}
          variant="outlined"
          label="Description"
          onChange={(e) =>
            setNewMenu({ ...newMenu, description: e.target.value })
          }
        />
        <FormControl sx={{ mb: 2 }}>
          <InputLabel>Menu Categories</InputLabel>
          <Select
            label="Menu Categories"
            value={newMenu.menuCategories as number[]}
            multiple
            onChange={(e) => {
              const values = e.target.value as number[];
              setNewMenu({ ...newMenu, menuCategories: values });
            }}
            renderValue={(value) => {
              const selectedMenuCategories = menuCategories
                .filter((item) =>
                  newMenu.menuCategories.find((i) => i === item.id)
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
                    item.id && newMenu.menuCategories.includes(item.id)
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
