import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { getSelectedLocationId } from "@/utils/client";
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

const NewTable = ({ open, setOpen }: Props) => {
  const { company } = useAppSelector(appData);
  const selectedLocationId = getSelectedLocationId() as string;
  const [newTable, setNewTable] = useState({
    name: "",
    locationId: selectedLocationId,
    companyId: company?.id,
  });
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Create New Table</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
        <TextField
          variant="outlined"
          label="name"
          onChange={(e) => setNewTable({ ...newTable, name: e.target.value })}
        />
        <Button variant="contained" sx={{ alignSelf: "end", mt: 2 }}>
          Create
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default NewTable;
