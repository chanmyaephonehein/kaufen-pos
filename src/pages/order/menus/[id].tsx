import AddonCategories from "@/components/AddonCategories";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { getAddonCategoriesByMenuId } from "@/utils/client";
import { useRouter } from "next/router";

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

  return (
    <div>
      <AddonCategories
        validAddonCategories={validAddonCategories}
        validAddons={validAddons}
      />
    </div>
  );
};

export default OrderAppMenu;
