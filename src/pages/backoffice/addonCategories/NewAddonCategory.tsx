import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const NewAddonCategory = ({ open, setOpen }: Props) => {
  const { menus } = useAppSelector(appData);
  const [newAddonCategory, setNewAddonCategory] = useState({ name: "" });
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Create Addon Category</DialogTitle>
      <DialogContent>
        <TextField
          variant="outlined"
          label="Name"
          onChange={(evt) => setNewAddonCategory({ name: evt.target.value })}
        />
      </DialogContent>
    </Dialog>
  );
};

export default NewAddonCategory;
