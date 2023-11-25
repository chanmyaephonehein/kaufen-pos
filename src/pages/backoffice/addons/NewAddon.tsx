import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { getSelectedLocationId } from "@/utils/client";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const NewAddon = ({ open, setOpen }: Props) => {
  const {
    menusMenuCategoriesLocations,
    menusAddonCategories,
    addonCategories,
  } = useAppSelector(appData);
  const [newAddon, setNewAddon] = useState({
    name: "",
    price: 0,
    addonCategoryId: [] as number[],
  });
  const selectedLocationId = getSelectedLocationId() as string;

  const validMenuIds = menusMenuCategoriesLocations
    .filter((item) => item.locationId === Number(selectedLocationId))
    .map((item) => item.menuId);

  const validAddonCategoryIds = menusAddonCategories
    .filter((item) => validMenuIds.includes(item.menuId))
    .map((item) => item.addonCategoryId);

  const validAddonCategories = addonCategories.filter((item) =>
    validAddonCategoryIds.includes(item.id)
  );

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Create New Addon</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
        <TextField
          sx={{ mt: 1, mb: 2 }}
          label="name"
          variant="outlined"
          onChange={(e) => setNewAddon({ ...newAddon, name: e.target.value })}
        />
        <TextField
          sx={{ mb: 2 }}
          label="price"
          type="number"
          variant="outlined"
          onChange={(e) =>
            setNewAddon({ ...newAddon, price: Number(e.target.value) })
          }
        />
        <FormControl>
          <InputLabel>Addon Categories</InputLabel>
          <Select
            label="Addon Categories"
            value={newAddon.addonCategoryId}
            onChange={(e) =>
              setNewAddon({
                ...newAddon,
                addonCategoryId: e.target.value as number[],
              })
            }
          >
            {validAddonCategories.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" sx={{ alignSelf: "end", mt: 2 }}>
          Create
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default NewAddon;
