import {
  Box,
  FormControlLabel,
  Radio,
  Checkbox,
  Typography,
} from "@mui/material";
import { AddonCategories, Addons } from "@prisma/client";
import React from "react";

interface Props {
  addonCategory: AddonCategories;
  validAddons: Addons[];
  selectedAddon: Addons[];
  onChange: (checked: boolean, addon: Addons) => void;
}

const OrderAddons = ({
  addonCategory,
  validAddons,
  selectedAddon,
  onChange,
}: Props) => {
  const addons = validAddons.filter(
    (item) => item.addonCategoryId === addonCategory.id
  );

  return (
    <div className="flex flex-col">
      {addons.map((item) => (
        <div key={item.id} className="flex items-center justify-between">
          <FormControlLabel
            value={item.name}
            control={
              addonCategory.isRequired ? (
                <Radio
                  checked={
                    selectedAddon.find((i) => i.id === item.id) ? true : false
                  }
                  onChange={(evt, value) => onChange(value, item)}
                />
              ) : (
                <Checkbox
                  checked={
                    selectedAddon.find((i) => i.id === item.id) ? true : false
                  }
                  onChange={(e, v) => onChange(v, item)}
                />
              )
            }
            label={item.name}
          />
          <Typography>{item.price}</Typography>
        </div>
      ))}
    </div>
  );
};

export default OrderAddons;
