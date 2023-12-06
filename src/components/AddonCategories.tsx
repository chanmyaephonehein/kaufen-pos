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
    <Box>
      {validAddonCategories.map((item) => (
        <Box key={item.id}>
          <Box sx={{ display: "flex", justifyContent: "space-around" }}>
            <Typography>{item.name}</Typography>
            <Chip label={item.isRequired ? "Required" : "Optional"} />
          </Box>
          <OrderAddons validAddons={validAddons} addonCategory={item} />
        </Box>
      ))}
    </Box>
  );
};

export default AddonCategories;
