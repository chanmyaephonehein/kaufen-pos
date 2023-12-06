import { Box } from "@mui/material";
import { AddonCategories, Addons } from "@prisma/client";
import React from "react";

interface Props {
  addonCategory: AddonCategories;
  validAddons: Addons[];
}

const OrderAddons = ({ addonCategory, validAddons }: Props) => {
  const addons = validAddons.filter(
    (item) => item.addonCategoryId === addonCategory.id
  );

  return (
    <Box>
      {addons.map((item) => (
        <p key={item.id}>{item.name}</p>
      ))}
    </Box>
  );
};

export default OrderAddons;
