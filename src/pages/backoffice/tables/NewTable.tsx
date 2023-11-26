import { config } from "@/config";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { addTable } from "@/store/slices/tablesSlice";
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
  const dispatch = useAppDispatch();
  const selectedLocationId = Number(getSelectedLocationId());
  const [newTable, setNewTable] = useState({
    name: "",
    locationId: Number(selectedLocationId),
  });
  const createTable = async () => {
    const isValid = newTable.name && newTable.locationId;
    if (!isValid) return alert("Fill the blank");
    const response = await fetch(`${config.apiBaseUrl}/tables`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTable),
    });
    const tableCreated = await response.json();
    dispatch(addTable(tableCreated));
    setOpen(false);
  };
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Create New Table</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
        <TextField
          variant="outlined"
          label="name"
          onChange={(e) => setNewTable({ ...newTable, name: e.target.value })}
        />
        <Button
          onClick={createTable}
          variant="contained"
          sx={{ alignSelf: "end", mt: 2 }}
        >
          Create
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default NewTable;
