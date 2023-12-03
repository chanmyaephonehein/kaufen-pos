import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import {
  getAddonCategoriesByMenuId,
  getSelectedLocationId,
} from "@/utils/client";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  TextField,
  Typography,
} from "@mui/material";
import { AddonCategories, Menus } from "@prisma/client";
import { useRouter } from "next/router";
import { useState } from "react";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { config } from "@/config";
import { updateMenu } from "@/store/slices/menusSlice";
import { fetchMenusAddonCategories } from "@/store/slices/menusAddonCategoriesSlice";
import { fetchMenusMenuCategoriesLocations } from "@/store/slices/menusMenuCategoriesLocationsSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteDialog from "@/components/DeleteDialog";

const EditMenu = () => {
  const { menusAddonCategories, addonCategories, menus } =
    useAppSelector(appData);
  const router = useRouter();
  const menuId = router.query.id as string;
  const selectedLocationId = getSelectedLocationId();
  const validAddonCategories = getAddonCategoriesByMenuId(
    menuId,
    menusAddonCategories,
    addonCategories
  ) as AddonCategories[];
  const validMenu = menus.find((item) => item.id === Number(menuId)) as Menus;
  const [updatedMenu, setUpdatedMenu] = useState<Partial<Menus>>(validMenu);
  const [updateAddonCategories, setUpdateAddonCategory] =
    useState<AddonCategories[]>(validAddonCategories);

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const dispatch = useAppDispatch();
  const handleUpdateMenu = async () => {
    const response = await fetch(`${config.apiBaseUrl}/menus`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: updatedMenu.id,
        name: updatedMenu.name,
        price: updatedMenu.price,
        addonCategoryIds: updateAddonCategories.map(
          (item) => item.id
        ) as number[],
      }),
    });
    const updatedMenusAddonCategory = await response.json();
    dispatch(updateMenu(updatedMenusAddonCategory));
    dispatch(
      fetchMenusAddonCategories(
        updateAddonCategories.map((item) => item.id) as number[]
      )
    );
    dispatch(fetchMenusMenuCategoriesLocations(selectedLocationId as string));
    router.push({ pathname: "/backoffice/menus" });
  };
  const [open, setOpen] = useState(false);
  const handleDeleteMenu = async () => {};
  return (
    <Box>
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
      <Typography variant="h4">Menu Edit</Typography>
      <TextField
        sx={{ mt: 2 }}
        label="Name"
        value={updatedMenu?.name}
        onChange={(e) =>
          setUpdatedMenu({ ...updatedMenu, name: e.target.value })
        }
      />
      <TextField
        sx={{ my: 2 }}
        label="Price"
        type="number"
        value={updatedMenu?.price}
        onChange={(e) =>
          setUpdatedMenu({ ...updatedMenu, price: Number(e.target.value) })
        }
      />
      <Autocomplete
        disableCloseOnSelect
        value={updateAddonCategories}
        onChange={(e, v) => setUpdateAddonCategory(v)}
        options={addonCategories}
        renderOption={(props, options, { selected }) => (
          <li {...props}>
            <Checkbox
              checkedIcon={checkedIcon}
              icon={icon}
              checked={selected}
            />
            {options.name}
          </li>
        )}
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        multiple
        renderInput={(params) => (
          <TextField {...params} label="Addon Categories" />
        )}
      />
      <Button
        onClick={handleUpdateMenu}
        variant="contained"
        sx={{ width: "fit-content", mt: 2 }}
      >
        Update
      </Button>
      <DeleteDialog
        open={open}
        setOpen={setOpen}
        callback={handleDeleteMenu}
        title="Menu"
      />
    </Box>
  );
};

export default EditMenu;
