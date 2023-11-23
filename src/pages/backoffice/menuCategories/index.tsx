import CategoryIcon from "@mui/icons-material/Category";
import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { getSelectedLocationId } from "@/utils/client";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Loading from "@/components/Loading";
import ItemCard from "@/components/ItemCard";
import NewMenuCategory from "./NewMenuCategory";

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

  const getMenusCount = (menuCategoryId?: number) => {
    if (!menuCategoryId) return 0;
    return menusMenuCategoriesLocations.filter(
      (item) =>
        item.menuCategoryId === menuCategoryId &&
        item.menuId &&
        item.locationId === Number(selectedLoactionId)
    ).length;
  };

  if (isLoading) return <Loading />;
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
          <ItemCard
            key={item.id}
            href={`/backoffice/menuCategories/${item.id}`}
            icon={<CategoryIcon sx={{ fontSize: "60px", my: 3 }} />}
            title={item.name}
            subTitle={`${getMenusCount(item.id)} menus`}
          />
        ))}
      </div>
      <NewMenuCategory open={open} setOpen={setOpen} />
    </div>
  );
};

export default MenuCategories;
