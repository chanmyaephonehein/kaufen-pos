import Layout from "@/components/Layout";
import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { getSelectedLocationId } from "@/utils/client";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";

const MenuCategories = () => {
  const [open, setOpen] = useState(false);
  const { menusMenuCategoriesLocations, menuCategories, isLoading } =
    useAppSelector(appData);
  const selectedLoactionId = getSelectedLocationId() as string;
  const validMenuCategoryId = menusMenuCategoriesLocations
    .filter((item) => item.locationId === Number(selectedLoactionId))
    .map((item) => item.menuCategoryId);

  const validMenuCategories = menuCategories.filter(
    (item) => item.id && validMenuCategoryId.includes(item.id)
  );

  const getMenusCount = (menuCategoryId: number) => {
    if (!menuCategoryId) return 0;
    return menusMenuCategoriesLocations.filter(
      (item) =>
        item.menuCategoryId === menuCategoryId &&
        item.menuId &&
        item.locationId === Number(selectedLoactionId)
    ).length;
  };
  return (
    <div className="col-span-5">
      <div className="flex justify-end">
        <Button
          onClick={() => setOpen(true)}
          variant="contained"
          startIcon={<AddIcon />}
        >
          New Menu Category
        </Button>
      </div>
      <div className="flex flex-row">
        {validMenuCategories.map((item) => (
          <div key={item.id} className="flex m-3 bg-red-200 flex-col ">
            <div>{item.name}</div>
            <span className="flex justify-center">
              {getMenusCount(item.id)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuCategories;
