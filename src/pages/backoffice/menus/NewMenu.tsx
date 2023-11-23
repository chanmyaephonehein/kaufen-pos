import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const NewMenu = ({ open, setOpen }: Props) => {
  const { menuCategories, menusMenuCategoriesLocations } =
    useAppSelector(appData);
  const [newMenu, setNewMenu] = useState({ name: "" });
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Create a menu</DialogTitle>
      <DialogContent>
        <TextField
          variant="outlined"
          label="Name"
          onChange={(e) => {
            setNewMenu({ name: e.target.value });
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default NewMenu;
