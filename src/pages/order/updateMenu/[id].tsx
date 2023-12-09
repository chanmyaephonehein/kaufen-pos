import AddonCategories from "@/components/AddonCategories";
import QuantitySelector from "@/components/QuantitySelector";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { selectCart, updateCart } from "@/store/slices/cartSlice";
import { getAddonCategoriesByMenuId } from "@/utils/client";
import { Button } from "@mui/material";
import { AddonCategories as AddonCategory, Addons } from "@prisma/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
const UpdateMenu = () => {
  const dispatch = useAppDispatch();
  const { addonCategories, menusAddonCategories, addons } =
    useAppSelector(appData);
  const { items } = useAppSelector(selectCart);
  const router = useRouter();
  const query = router.query;
  const randomId = router.query.id as string;
  const cartItem = items.find((item) => item.id === randomId);
  const menuId = cartItem?.menu.id as Number;
  const validAddonCategories = cartItem
    ? getAddonCategoriesByMenuId(
        String(menuId),
        menusAddonCategories,
        addonCategories
      )
    : [];
  const validAddonCategoryIds = validAddonCategories.map((item) => item.id);
  const validAddons = addons.filter((item) =>
    validAddonCategoryIds.includes(item.addonCategoryId)
  );
  const [selectedAddon, setSelectedAddon] = useState<Addons[]>([]);
  const handleSelectAddon = (selected: boolean, addon: Addons) => {
    const parentAddon = validAddonCategories.find(
      (item) => item.id === addon.addonCategoryId
    ) as AddonCategory;
    if (parentAddon?.isRequired) {
      const selectedAddonCategory = selectedAddon.find(
        (item) => item.addonCategoryId === addon.addonCategoryId
      );
      let newArray: Addons[] = [];
      if (selectedAddonCategory) {
        newArray = selectedAddon.filter(
          (item) => item.addonCategoryId !== item.addonCategoryId
        );
        setSelectedAddon([...newArray, addon]);
      } else {
        setSelectedAddon([...selectedAddon, addon]);
      }
    } else {
      if (selected) {
        setSelectedAddon([...selectedAddon, addon]);
      } else {
        setSelectedAddon([
          ...selectedAddon.filter(
            (item) => item.addonCategoryId !== addon.addonCategoryId
          ),
        ]);
      }
    }
  };
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (cartItem) {
      const addon = cartItem.addon as Addons[];
      setSelectedAddon(addon as Addons[]);
      setQuantity(cartItem.quantity);
    }
  }, [cartItem, items]);
  const handleUpdateMenu = () => {
    if (cartItem) {
      dispatch(
        updateCart({
          id: cartItem?.id,
          menu: cartItem?.menu,
          addon: selectedAddon,
          quantity: quantity,
        })
      );
    }
    router.push({ pathname: "/order/cart", query });
  };
  const increase = () => {
    setQuantity(quantity + 1);
  };

  const decrease = () => {
    setQuantity(quantity - 1 === 0 ? quantity : quantity - 1);
  };
  return (
    <div>
      <AddonCategories
        validAddonCategories={validAddonCategories}
        validAddons={validAddons}
        selectedAddon={selectedAddon}
        onChange={(checked, item) => handleSelectAddon(checked, item)}
      />
      <QuantitySelector
        value={quantity}
        increase={increase}
        decrease={decrease}
      />
      <Button variant="contained" onClick={handleUpdateMenu}>
        Update
      </Button>
    </div>
  );
};

export default UpdateMenu;
