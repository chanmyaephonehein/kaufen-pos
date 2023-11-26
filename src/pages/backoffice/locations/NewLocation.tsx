import { config } from "@/config";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { addLocation } from "@/store/slices/locationsSlice";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const NewLocation = ({ open, setOpen }: Props) => {
  const { company } = useAppSelector(appData);
  const dispatch = useAppDispatch();
  const [newLocation, setNewLocation] = useState({
    name: "",
    address: "",
    companyId: company?.id,
  });

  const createLocation = async () => {
    const isValid = newLocation.name && newLocation.address;
    if (!isValid) return alert("Fill all blank");
    const response = await fetch(`${config.apiBaseUrl}/locations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newLocation),
    });
    const locationCreated = await response.json();
    dispatch(addLocation(locationCreated));
    setOpen(false);
  };
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Create New Location</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
        <TextField
          sx={{ mb: 2, mt: 1 }}
          variant="outlined"
          label="Name"
          onChange={(e) =>
            setNewLocation({ ...newLocation, name: e.target.value })
          }
        />
        <TextField
          sx={{ mb: 2 }}
          variant="outlined"
          label="Address"
          onChange={(e) =>
            setNewLocation({ ...newLocation, address: e.target.value })
          }
        />
        <Button
          onClick={createLocation}
          variant="contained"
          sx={{ alignSelf: "end" }}
        >
          Create
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default NewLocation;
