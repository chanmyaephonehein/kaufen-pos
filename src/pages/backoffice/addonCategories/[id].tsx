import { config } from "@/config";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  deleteAddonCategory,
  setAddonCategories,
  updateAddonCategory,
} from "@/store/slices/addonCategoriesSlice";
import { appData, fetchAppData } from "@/store/slices/appSlice";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { AddonCategories, Addons } from "@prisma/client";
import { useRouter } from "next/router";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteDialog from "@/components/DeleteDialog";
import { fetchMenusAddonCategories } from "@/store/slices/menusAddonCategoriesSlice";
import { getAddonsByLocationId, getSelectedLocationId } from "@/utils/client";
import CheckBox from "@mui/icons-material/CheckBox";

const EditAddonCategory = () => {
  const dispatch = useAppDispatch();
  const {
    addonCategories,
    menus,
    menusAddonCategories,
    menusMenuCategoriesLocations,
    addons,
  } = useAppSelector(appData);
  const router = useRouter();
  const addonCategoryId = router.query.id as string;
  const addonCategory = addonCategories.find(
    (item) => item.id === Number(addonCategoryId)
  ) as AddonCategories;
  const [updatedAddonCategory, setUpdatedAddonCategory] =
    useState<AddonCategories>(addonCategory);

  const handleUpdateAddonCategory = async () => {
    const response = await fetch(`${config.apiBaseUrl}/addonCategories`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedAddonCategory),
    });
    const addonCategory = await response.json();
    dispatch(updateAddonCategory(addonCategory));
    router.push({ pathname: "/backoffice/addonCategories" });
  };

  const [open, setOpen] = useState(false);
  const handleDeleteAddonCategory = async () => {
    await fetch(`${config.apiBaseUrl}/addonCategories?id=${addonCategoryId}`, {
      method: "DELETE",
    });
    dispatch(deleteAddonCategory(addonCategory));
    dispatch(fetchAppData({ locationId: undefined }));
    router.push({ pathname: "/backoffice/addonCategories" });
  };

  const validAddon = getAddonsByLocationId(
    getSelectedLocationId() as string,
    menusMenuCategoriesLocations,
    menusAddonCategories,
    addons
  );

  const selectedAddon = addons.filter(
    (item) => item.addonCategoryId === Number(addonCategoryId)
  );

  const [addonUpdate, setAddonUpdate] = useState<Addons[]>(selectedAddon);
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          sx={{ width: "fit-content" }}
          onClick={() => setOpen(true)}
        >
          DELETE
        </Button>
      </Box>
      <TextField
        label="Addon Category"
        value={updatedAddonCategory?.name}
        onChange={(e) =>
          setUpdatedAddonCategory({
            ...updatedAddonCategory,
            name: e.target.value,
          })
        }
      />
      <FormControlLabel
        label="Required"
        control={
          <Switch
            checked={updatedAddonCategory?.isRequired}
            onChange={(e) =>
              setUpdatedAddonCategory({
                ...updatedAddonCategory,
                isRequired: e.target.checked,
              })
            }
          />
        }
      />
      <FormControl sx={{ mt: 3 }}>
        <InputLabel>Addons</InputLabel>
        <Select
          input={<OutlinedInput label="Menus" />}
          label="Addons"
          multiple
          value={addonUpdate}
          onChange={(e) => {
            const value = e.target.value as number[];
            setAddonUpdate({ ...addonUpdate, id: value });
          }}
        >
          {validAddon.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              <CheckBox />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        onClick={handleUpdateAddonCategory}
        sx={{ width: "fit-content", mt: 2 }}
        variant="contained"
      >
        Update
      </Button>
      <DeleteDialog
        open={open}
        setOpen={setOpen}
        title="Addon Category"
        callback={handleDeleteAddonCategory}
      />
    </Box>
  );
};

export default EditAddonCategory;
