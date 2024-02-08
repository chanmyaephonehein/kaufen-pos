import Loading from "@/components/Loading";
import MenuCard from "@/components/MenuCard";
import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { Button, Tab, Tabs } from "@mui/material";
import { MenuCategories } from "@prisma/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Order = () => {
  const { orders } = useAppSelector(appData);
  const router = useRouter();
  const query = router.query;
  const selectedLocationId = router.query.locationId as string;
  const selectedTableId = router.query.tableId as string;
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
  const orderId = orders.find(
    (item) =>
      item.locationId === Number(selectedLocationId) &&
      item.tableId === Number(selectedTableId) &&
      item.isPaid === false
  )?.id;
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
      <div className="flex flex-row flex-wrap">
        {validMenus.map((item) => (
          <MenuCard
            key={item.id}
            menu={item}
            href={{ pathname: `order/menus/${item.id}`, query }}
          />
        ))}
      </div>
    );
  };
  return (
    <div className="mx-64">
      <div className="flex justify-center mb-4">
        <Button
          variant="outlined"
          onClick={() => {
            router.push({ pathname: `/order/activeOrder/${orderId}`, query });
          }}
        >
          Your Orders
        </Button>
      </div>
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
