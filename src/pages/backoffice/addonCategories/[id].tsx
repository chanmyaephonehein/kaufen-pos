import { config } from "@/config";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setAddonCategories,
  updateAddonCategory,
} from "@/store/slices/addonCategoriesSlice";
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
  const dispatch = useAppDispatch();
  const { addonCategories } = useAppSelector(appData);
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
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
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
      <Button
        onClick={handleUpdateAddonCategory}
        sx={{ width: "fit-content", mt: 2 }}
        variant="contained"
      >
        Update
      </Button>
    </Box>
  );
};

export default EditAddonCategory;
