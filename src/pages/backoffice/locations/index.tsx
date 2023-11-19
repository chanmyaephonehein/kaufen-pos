import AddIcon from "@mui/icons-material/Add";
import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { Box, Button } from "@mui/material";
import { useState } from "react";

const Locations = () => {
  const { locations, isLoading } = useAppSelector(appData);
  const [open, setOpen] = useState(false);
  return (
    <div className="col-span-5">
      <div className="flex justify-end">
        <Button
          onClick={() => setOpen(true)}
          variant="contained"
          startIcon={<AddIcon />}
        >
          New Location
        </Button>
      </div>
      <div>
        {locations.map((item) => (
          <div key={item.id}>
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Locations;
