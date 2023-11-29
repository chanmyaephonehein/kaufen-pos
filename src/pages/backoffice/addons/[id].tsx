import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { Box, Button, TextField } from "@mui/material";
import { Addons } from "@prisma/client";
import { useRouter } from "next/router";
import { useState } from "react";

const EditAddon = () => {
  const { addons } = useAppSelector(appData);
  const router = useRouter();
  const addonId = router.query.id as string;
  const addon = addons.find((item) => item.id === Number(addonId)) as Addons;
  const [updateAddon, setUpdateAddon] = useState<Addons>(addon);
  return (
    <Box>
      <TextField
        sx={{ mt: 2 }}
        value={updateAddon.name}
        label="Name"
        onChange={(e) =>
          setUpdateAddon({ ...updateAddon, name: e.target.value })
        }
      />
      <TextField
        sx={{ my: 2 }}
        value={updateAddon.price}
        label="Price"
        onChange={(e) =>
          setUpdateAddon({ ...updateAddon, price: Number(e.target.value) })
        }
      />
      <Button variant="contained" sx={{ width: "fit-content" }}>
        Update
      </Button>
    </Box>
  );
};

export default EditAddon;
