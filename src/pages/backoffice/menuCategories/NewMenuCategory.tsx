import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { Locations } from "@prisma/client";
import { useState } from "react";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const NewMenuCategory = ({ open, setOpen }: Props) => {
  const { locations } = useAppSelector(appData);
  const [newMenuCategory, setNewMenuCategory] = useState({
    name: "",
    locationIds: [] as number[],
  });

  const createNewMenu = () => {};
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Create Menu Categories</DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          width: 300,
          height: 200,
        }}
      >
        <TextField
          sx={{ mb: 2, mt: 1 }}
          label="Name"
          variant="outlined"
          onChange={(evt) =>
            setNewMenuCategory({ ...newMenuCategory, name: evt.target.value })
          }
        />
        <FormControl>
          <InputLabel>Locations</InputLabel>
          <Select
            sx={{ mb: 2 }}
            label="Locations"
            value={newMenuCategory.locationIds}
            multiple
            onChange={(e) => {
              const values = e.target.value as number[];
              setNewMenuCategory({ ...newMenuCategory, locationIds: values });
            }}
            input={<OutlinedInput label="Locations" />}
            renderValue={(value) => {
              const selectedLocations = locations.filter((item) =>
                newMenuCategory.locationIds.find((i) => item.id === i)
              );
              return selectedLocations.map((item) => item.name).join(",");
            }}
            MenuProps={MenuProps}
          >
            {locations.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                <Checkbox
                  checked={
                    item.id && newMenuCategory.locationIds.includes(item.id)
                      ? true
                      : false
                  }
                />
                <ListItemText primary={item.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          sx={{
            width: "fit-content",
            display: "flex",
            alignSelf: "flex-end",
          }}
        >
          Create
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default NewMenuCategory;
