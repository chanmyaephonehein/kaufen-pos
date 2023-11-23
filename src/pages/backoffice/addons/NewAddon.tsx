import { Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const NewAddon = ({ open, setOpen }: Props) => {
  const [newAddon, setNewAddon] = useState({ name: "" });
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Create New Addon</DialogTitle>
      <DialogContent>
        <TextField
          label="name"
          variant="outlined"
          onChange={(e) => setNewAddon({ name: e.target.value })}
        />
      </DialogContent>
    </Dialog>
  );
};

export default NewAddon;
