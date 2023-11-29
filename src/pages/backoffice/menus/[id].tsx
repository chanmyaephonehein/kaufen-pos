import { useAppSelector } from "@/store/hooks";
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
  const [updateMenu, setUpdateMenu] = useState<Partial<Menus>>(validMenu);
  const [updateAddonCategories, setUpdateAddonCategory] =
    useState<AddonCategories[]>(validAddonCategories);

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  return (
    <Box>
      <Typography variant="h4">Menu Edit</Typography>
      <TextField
        sx={{ mt: 2 }}
        label="Name"
        value={updateMenu?.name}
        onChange={(e) => setUpdateMenu({ ...updateMenu, name: e.target.value })}
      />
      <TextField
        sx={{ my: 2 }}
        label="Price"
        type="number"
        value={updateMenu?.price}
        onChange={(e) =>
          setUpdateMenu({ ...updateMenu, price: Number(e.target.value) })
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
      <Button variant="contained" sx={{ width: "fit-content", mt: 2 }}>
        Update
      </Button>
    </Box>
  );
};

export default EditMenu;
