import { config } from "@/config";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { updateLocation } from "@/store/slices/locationsSlice";
import { Box, Button, TextField } from "@mui/material";
import { Locations } from "@prisma/client";
import { useRouter } from "next/router";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteDialog from "@/components/DeleteDialog";

const EditLocation = () => {
  const dispatch = useAppDispatch();
  const { locations } = useAppSelector(appData);
  const router = useRouter();
  const locationId = router.query.id as string;
  const location = locations.find(
    (item) => item.id === Number(locationId)
  ) as Locations;
  const [updatedLocation, setUpdatedLocation] = useState<Locations>(location);
  const handleUpdateLocation = async () => {
    const response = await fetch(`${config.apiBaseUrl}/locations`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedLocation),
    });
    const location = await response.json();
    dispatch(updateLocation(location));
    router.push({ pathname: "/backoffice/locations" });
  };
  const [open, setOpen] = useState(false);
  const handleDeleteLocation = async () => {};
  return (
    <Box>
      {" "}
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
        label="Location"
        value={updatedLocation?.name}
        onChange={(e) =>
          setUpdatedLocation({ ...updatedLocation, name: e.target.value })
        }
      />
      <TextField
        sx={{ my: 2 }}
        label="Address"
        value={updatedLocation?.address}
        onChange={(e) =>
          setUpdatedLocation({ ...updatedLocation, address: e.target.value })
        }
      />
      <Button
        onClick={handleUpdateLocation}
        variant="contained"
        sx={{ width: "fit-content" }}
      >
        Update
      </Button>
      <DeleteDialog
        open={open}
        setOpen={setOpen}
        callback={handleDeleteLocation}
        title="Location"
      />
    </Box>
  );
};

export default EditLocation;
