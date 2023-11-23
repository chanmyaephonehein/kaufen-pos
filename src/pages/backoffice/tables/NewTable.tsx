import { Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const NewTable = ({ open, setOpen }: Props) => {
  const [newTable, setNewTable] = useState({ name: "" });
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Create New Table</DialogTitle>
      <DialogContent>
        <TextField
          variant="outlined"
          label="name"
          onChange={(e) => setNewTable({ name: e.target.value })}
        />
      </DialogContent>
    </Dialog>
  );
};

export default NewTable;
