import CheckBox from "@mui/icons-material/CheckBox";
import { Box, FormControlLabel, Radio } from "@mui/material";
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
    <div className="flex flex-col">
      {addons.map((item) => (
        <FormControlLabel
          value={item.name}
          key={item.id}
          control={addonCategory.isRequired ? <Radio /> : <CheckBox />}
          label={item.name}
        />
      ))}
    </div>
  );
};

export default OrderAddons;
