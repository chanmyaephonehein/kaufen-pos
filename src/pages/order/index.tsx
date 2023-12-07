import Loading from "@/components/Loading";
import MenuCard from "@/components/MenuCard";
import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { Box, Tab, Tabs } from "@mui/material";
import { MenuCategories } from "@prisma/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Order = () => {
  const router = useRouter();
  const query = router.query;
  const selectedLocationId = router.query.locationId as string;
  const { menuCategories, menus, menusMenuCategoriesLocations } =
    useAppSelector(appData);
  const [value, setValue] = useState(0);
  const [selectedMenuCategory, setSelectedMenuCategory] =
    useState<MenuCategories>();

  useEffect(() => {
    if (menuCategories) {
      setSelectedMenuCategory(menuCategories[0]);
    }
  }, [menuCategories]);
  const renderValue = () => {
    const isValid = selectedLocationId && selectedMenuCategory;
    if (!isValid) return <Loading />;
    const validMenuIds = menusMenuCategoriesLocations
      .filter(
        (item) =>
          item.locationId === Number(selectedLocationId) &&
          item.menuCategoryId === selectedMenuCategory.id
      )
      .map((item) => item.menuId);

    const validMenus = menus.filter((item) => validMenuIds.includes(item.id));

    return (
      <Box>
        {validMenus.map((item) => (
          <MenuCard
            key={item.id}
            menu={item}
            href={{ pathname: `order/menus/${item.id}`, query }}
          />
        ))}
      </Box>
    );
  };
  return (
    <div>
      Order
      <Tabs value={value} onChange={(e, v) => setValue(v)}>
        {menuCategories.map((item) => (
          <Tab
            key={item.id}
            label={item.name}
            onClick={() => setSelectedMenuCategory(item)}
          />
        ))}
      </Tabs>
      {renderValue()}
    </div>
  );
};

export default Order;
