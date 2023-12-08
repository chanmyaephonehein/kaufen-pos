import AddonCategories from "@/components/AddonCategories";
import QuantitySelector from "@/components/QuantitySelector";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  appData,
  selectAddonCategories,
  selectAddons,
} from "@/store/slices/appSlice";
import { CartItem, addoToCart } from "@/store/slices/cartSlice";
import { generateRandomId, getAddonCategoriesByMenuId } from "@/utils/client";
import { Button } from "@mui/material";
import {
  AddonCategories as AddonCategory,
  Addons,
  Menus,
} from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const OrderAppMenu = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const query = router.query;
  const menuId = query.id as string;

  const { menusAddonCategories, menus, addonCategories, addons } =
    useAppSelector(appData);
  const menu = menus.find((item) => item.id === Number(menuId)) as Menus;
  const validAddonCategories = getAddonCategoriesByMenuId(
    menuId,
    menusAddonCategories,
    addonCategories
  );

  const validAddonCategoryIds = validAddonCategories.map((item) => item.id);
  const validAddons = addons.filter((item) =>
    validAddonCategoryIds.includes(item.addonCategoryId)
  );

  const [isDisabled, setIsDisabled] = useState(false);
  const [selectedAddon, setSelectedAddon] = useState<Addons[]>([]);

  const [amount, setAmount] = useState<number>(1);
  const increase = () => {
    setAmount(amount + 1);
  };
  const decrease = () => {
    setAmount(amount - 1 === 0 ? amount : amount - 1);
  };
  useEffect(() => {
    const requiredAddonCategory = validAddonCategories.filter(
      (item) => item.isRequired
    ) as AddonCategory[];
    if (requiredAddonCategory.length) {
      if (!selectedAddon.length) {
        setIsDisabled(true);
      } else {
        const selectedRequiredAddonCategory = selectedAddon.filter((item) => {
          const addonCategory = validAddonCategories.find(
            (i) => i.id === item.addonCategoryId
          );
          if (addonCategory?.isRequired) return true;
          return false;
        });
        const hasSelectedAll =
          requiredAddonCategory.length === selectedRequiredAddonCategory.length;
        const disable = hasSelectedAll ? false : true;
        setIsDisabled(disable);
      }
    }
  }, [validAddonCategories, selectedAddon]);

  const handleSelectAddon = async (selected: boolean, addon: Addons) => {
    const parentOfAddon = validAddonCategories.find(
      (item) => item.id === addon.addonCategoryId
    ) as AddonCategory;
    if (parentOfAddon.isRequired) {
      const existingAddonCategory = selectedAddon.find(
        (item) => item.addonCategoryId === addon.addonCategoryId
      );
      if (existingAddonCategory) {
        let newArray = [];
        newArray = [
          ...selectedAddon.filter(
            (item) => item.addonCategoryId !== addon.addonCategoryId
          ),
        ];
        setSelectedAddon([...newArray, addon]);
      } else {
        setSelectedAddon([...selectedAddon, addon]);
      }
    } else {
      if (selected) {
        setSelectedAddon([...selectedAddon, addon]);
      } else {
        setSelectedAddon([
          ...selectedAddon.filter((item) => item.id !== addon.id),
        ]);
      }
    }
  };

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      addon: selectedAddon,
      quantity: amount,
      menu,
      id: generateRandomId(),
    };
    dispatch(addoToCart(cartItem));
    router.push({ pathname: "/order", query });
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
        value={amount}
        increase={increase}
        decrease={decrease}
      />
      <Button
        variant="contained"
        disabled={isDisabled}
        onClick={handleAddToCart}
      >
        Add to cart
      </Button>
    </div>
  );
};

export default OrderAppMenu;
