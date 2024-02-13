import { config } from "@/config";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  deleteAddonCategory,
  updateAddonCategory,
} from "@/store/slices/addonCategoriesSlice";
import { appData, fetchAppData } from "@/store/slices/appSlice";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import { AddonCategories, Addons } from "@prisma/client";
import { useRouter } from "next/router";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteDialog from "@/components/DeleteDialog";
import { getAddonsByAddonCategoryId } from "@/utils/client";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { fetchAddons, updateAddon } from "@/store/slices/addonsSlice";

const EditAddonCategory = () => {
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;

  const dispatch = useAppDispatch();
  const { addonCategories, addons } = useAppSelector(appData);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const addonCategoryId = router.query.id as string;
  const addonCategory = addonCategories.find(
    (item) => item.id === Number(addonCategoryId)
  ) as AddonCategories;

  const [updatedAddonCategory, setUpdatedAddonCategory] =
    useState<AddonCategories>(addonCategory);

  const validAddon = getAddonsByAddonCategoryId(addonCategoryId, addons);

  const [updatedAddon, setUpdatedAddon] = useState<Addons[]>(validAddon);

  const handleUpdateAddonCategory = async () => {
    const response = await fetch(`${config.apiBaseUrl}/addonCategories`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: updatedAddonCategory.id,
        name: updatedAddonCategory.name,
        isRequired: updatedAddonCategory.isRequired,
        addonIds: updatedAddon.map((item) => item.id) as number[],
        addons: updatedAddon as Addons[],
      }),
    });
    const addonCategory = await response.json();
    dispatch(updateAddonCategory(addonCategory));
    dispatch(fetchAddons(""));
    router.push({ pathname: "/backoffice/addonCategories" });
  };

  const handleDeleteAddonCategory = async () => {
    await fetch(`${config.apiBaseUrl}/addonCategories?id=${addonCategoryId}`, {
      method: "DELETE",
    });
    dispatch(deleteAddonCategory(addonCategory));
    dispatch(fetchAppData({ locationId: undefined }));
    router.push({ pathname: "/backoffice/addonCategories" });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          sx={{ width: "fit-content", marginBottom: "9px" }}
          onClick={() => setOpen(true)}
        >
          DELETE
        </Button>
      </Box>
      <div className="flex flex-col max-w-[400px]">
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
        <Autocomplete
          sx={{ mt: 3 }}
          disableCloseOnSelect
          value={updatedAddon}
          onChange={(e, v) => {
            setUpdatedAddon(v);
          }}
          options={addons}
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
          renderInput={(params) => <TextField {...params} label="Addons" />}
        />
        <Button
          onClick={handleUpdateAddonCategory}
          sx={{ width: "fit-content", mt: 2 }}
          variant="contained"
        >
          Update
        </Button>
      </div>
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
