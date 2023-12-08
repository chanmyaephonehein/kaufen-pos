import { Box, Chip, Typography } from "@mui/material";
import { AddonCategories, Addons } from "@prisma/client";
import React from "react";
import OrderAddons from "./Addons";

interface Props {
  validAddonCategories: AddonCategories[];
  validAddons: Addons[];
}

const AddonCategories = ({ validAddonCategories, validAddons }: Props) => {
  return (
    <div className="w-1/4">
      {validAddonCategories.map((item) => (
        <Box key={item.id} sx={{ mb: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h4">{item.name}</Typography>
            <Chip label={item.isRequired ? "Required" : "Optional"} />
          </Box>
          <OrderAddons validAddons={validAddons} addonCategory={item} />
        </Box>
      ))}
    </div>
  );
};

export default AddonCategories;
