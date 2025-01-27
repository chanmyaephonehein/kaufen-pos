import { Box, Chip, Typography } from "@mui/material";
import { AddonCategories as AddonCategory, Addons } from "@prisma/client";
import React from "react";
import OrderAddons from "./Addons";

interface Props {
  validAddonCategories: AddonCategory[];
  validAddons: Addons[];
  selectedAddon: Addons[];
  onChange: (checked: boolean, addon: Addons) => void;
}

const AddonCategories = ({
  validAddonCategories,
  validAddons,
  selectedAddon,
  onChange,
}: Props) => {
  return (
    <div>
      {validAddonCategories.map((item) => (
        <Box key={item.id} sx={{ mb: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h5">{item.name}</Typography>
            <Chip label={item.isRequired ? "Required" : "Optional"} />
          </Box>
          <OrderAddons
            validAddons={validAddons}
            addonCategory={item}
            selectedAddon={selectedAddon}
            onChange={(checked, addon) => onChange(checked, addon)}
          />
        </Box>
      ))}
    </div>
  );
};

export default AddonCategories;
