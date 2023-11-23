import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const NewMenuCategory = ({ open, setOpen }: Props) => {
  const { locations } = useAppSelector(appData);
  const [newMenuCategory, setNewMenuCategory] = useState({
    name: "",
    locationIds: [] as number[],
  });
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Create Menu Categories</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          variant="outlined"
          onChange={(evt) =>
            setNewMenuCategory({ ...newMenuCategory, name: evt.target.value })
          }
        />
      </DialogContent>
    </Dialog>
  );
};

export default NewMenuCategory;
