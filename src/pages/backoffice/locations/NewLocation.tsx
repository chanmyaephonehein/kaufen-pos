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
  const [newLocation, setNewLocation] = useState({ name: "", address: "" });
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
        <Button variant="contained" sx={{ alignSelf: "end" }}>
          Create
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default NewLocation;
