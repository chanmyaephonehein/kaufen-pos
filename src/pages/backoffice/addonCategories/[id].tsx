import { useAppSelector } from "@/store/hooks";
import { setAddonCategories } from "@/store/slices/addonCategoriesSlice";
import { appData } from "@/store/slices/appSlice";
import {
  Box,
  Button,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { AddonCategories } from "@prisma/client";
import { useRouter } from "next/router";
import { useState } from "react";

const EditAddonCategory = () => {
  const { addonCategories } = useAppSelector(appData);
  const router = useRouter();
  const addonCategoryId = router.query.id as string;
  const addonCategory = addonCategories.find(
    (item) => item.id === Number(addonCategoryId)
  ) as AddonCategories;
  const [updateAddonCategory, setUpdateAddonCategory] =
    useState<AddonCategories>(addonCategory);
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <TextField
        label="Addon Category"
        value={updateAddonCategory?.name}
        onChange={(e) =>
          setUpdateAddonCategory({
            ...updateAddonCategory,
            name: e.target.value,
          })
        }
      />
      <FormControlLabel
        label="Required"
        control={
          <Switch
            checked={updateAddonCategory?.isRequired}
            onChange={(e) =>
              setUpdateAddonCategory({
                ...updateAddonCategory,
                isRequired: e.target.checked,
              })
            }
          />
        }
      />
      <Button sx={{ width: "fit-content", mt: 2 }} variant="contained">
        Update
      </Button>
    </Box>
  );
};

export default EditAddonCategory;
