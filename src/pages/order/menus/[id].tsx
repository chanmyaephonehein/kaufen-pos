import AddonCategories from "@/components/AddonCategories";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  appData,
  selectAddonCategories,
  selectAddons,
} from "@/store/slices/appSlice";
import { getAddonCategoriesByMenuId } from "@/utils/client";
import { Button } from "@mui/material";
import { AddonCategories as AddonCategory, Addons } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const OrderAppMenu = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const query = router.query;
  const menuId = query.id as string;
  const { menusAddonCategories, addonCategories, addons } =
    useAppSelector(appData);
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

  interface Props {
    selected: boolean;
    addon: Addons;
  }

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
        const disable = hasSelectedAll ? true : false;
        setIsDisabled(disable);
      }
    }
  }, [validAddonCategories, selectedAddon]);

  const handleSelectAddon = ({ selected, addon }: Props) => {
    const parentOfAddon = validAddonCategories.find(
      (item) => item.id === addon.addonCategoryId
    ) as AddonCategory;
    if (parentOfAddon.isRequired) {
      const existingAddonCategory = selectedAddon.find(
        (item) => item.addonCategoryId === addon.addonCategoryId
      );
      if (existingAddonCategory) {
        setSelectedAddon([
          ...selectedAddon.filter(
            (item) => item.addonCategoryId !== addon.addonCategoryId
          ),
        ]);
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

  return (
    <div>
      <AddonCategories
        validAddonCategories={validAddonCategories}
        validAddons={validAddons}
      />
      <Button variant="contained" disabled={isDisabled}>
        Add to cart
      </Button>
    </div>
  );
};

export default OrderAppMenu;
