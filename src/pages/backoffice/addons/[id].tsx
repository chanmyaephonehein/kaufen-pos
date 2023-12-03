import { config } from "@/config";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateAddon } from "@/store/slices/addonsSlice";
import { appData } from "@/store/slices/appSlice";
import { Box, Button, TextField } from "@mui/material";
import { Addons } from "@prisma/client";
import { useRouter } from "next/router";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteDialog from "@/components/DeleteDialog";

const EditAddon = () => {
  const dispatch = useAppDispatch();
  const { addons } = useAppSelector(appData);
  const router = useRouter();
  const addonId = router.query.id as string;
  const addon = addons.find((item) => item.id === Number(addonId)) as Addons;
  const [updatedAddon, setUpdatedAddon] = useState<Addons>(addon);
  const handleUpdateAddon = async () => {
    const response = await fetch(`${config.apiBaseUrl}/addons`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedAddon),
    });
    const addon = await response.json();
    dispatch(updateAddon(addon));
    router.push({ pathname: "/backoffice/addons" });
  };

  const [open, setOpen] = useState(false);
  const handleDeleteAddon = async () => {};
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          sx={{ width: "fit-content" }}
          onClick={() => setOpen(true)}
        >
          DELETE
        </Button>
      </Box>
      <TextField
        sx={{ mt: 2 }}
        value={updatedAddon?.name}
        label="Name"
        onChange={(e) =>
          setUpdatedAddon({ ...updatedAddon, name: e.target.value })
        }
      />
      <TextField
        type="number"
        sx={{ my: 2 }}
        value={updatedAddon?.price}
        label="Price"
        onChange={(e) =>
          setUpdatedAddon({ ...updatedAddon, price: Number(e.target.value) })
        }
      />
      <Button
        onClick={handleUpdateAddon}
        variant="contained"
        sx={{ width: "fit-content" }}
      >
        Update
      </Button>
      <DeleteDialog
        open={open}
        setOpen={setOpen}
        callback={handleDeleteAddon}
        title="Addon"
      />
    </Box>
  );
};

export default EditAddon;
