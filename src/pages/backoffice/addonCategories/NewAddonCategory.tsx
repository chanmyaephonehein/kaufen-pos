import { config } from "@/config";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addAddonCategory } from "@/store/slices/addonCategoriesSlice";
import { appData } from "@/store/slices/appSlice";
import { addMenusAddonCategories } from "@/store/slices/menusAddonCategoriesSlice";
import { getSelectedLocationId } from "@/utils/client";
import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import { useState } from "react";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const NewAddonCategory = ({ open, setOpen }: Props) => {
  const { menus, menusMenuCategoriesLocations } = useAppSelector(appData);
  const dispatch = useAppDispatch();
  const [newAddonCategory, setNewAddonCategory] = useState({
    name: "",
    isRequired: false,
    menuIds: [] as number[],
  });

  const selectedLocationId = getSelectedLocationId() as string;

  const validMenuIds = menusMenuCategoriesLocations
    .filter((item) => item.locationId === Number(selectedLocationId))
    .map((item) => item.menuId);
  const validMenus = menus.filter((item) => validMenuIds.includes(item.id));

  const createNewAddonCategory = async () => {
    const isValid = newAddonCategory.name && newAddonCategory.menuIds.length;
    if (!isValid) return alert("Fill the blank");
    const response = await fetch(`${config.apiBaseUrl}/addonCategories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAddonCategory),
    });
    const addonCategoryCreated = await response.json();
    dispatch(addAddonCategory(addonCategoryCreated[0]));
    dispatch(addMenusAddonCategories(addonCategoryCreated[1]));
    setOpen(false);
  };
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Create Addon Category</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
        <TextField
          sx={{ mt: 1, mb: 2 }}
          variant="outlined"
          label="Name"
          onChange={(evt) =>
            setNewAddonCategory({ ...newAddonCategory, name: evt.target.value })
          }
        />
        <FormControl sx={{ mb: 2 }}>
          <InputLabel>Menus</InputLabel>
          <Select
            input={<OutlinedInput label="Menus" />}
            label="Menus"
            sx={{ mb: 2 }}
            multiple
            value={newAddonCategory.menuIds}
            onChange={(e) => {
              const values = e.target.value as number[];
              setNewAddonCategory({ ...newAddonCategory, menuIds: values });
            }}
            renderValue={(value) => {
              const selectedMenu = menus
                .filter((item) => newAddonCategory.menuIds.includes(item.id))
                .map((item) => item.name)
                .join(", ");
              return selectedMenu;
            }}
          >
            {validMenus.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                <Checkbox
                  checked={
                    item.id && newAddonCategory.menuIds.includes(item.id)
                      ? true
                      : false
                  }
                />
                <ListItemText primary={item.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControlLabel
          label="Required"
          control={
            <Switch
              checked={newAddonCategory.isRequired}
              onChange={(e) =>
                setNewAddonCategory({
                  ...newAddonCategory,
                  isRequired: e.target.checked,
                })
              }
            />
          }
        />
        <Button
          sx={{ alignSelf: "end", mt: 2 }}
          variant="contained"
          onClick={createNewAddonCategory}
        >
          Create
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default NewAddonCategory;
