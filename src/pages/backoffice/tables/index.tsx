import AddIcon from "@mui/icons-material/Add";
import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { getSelectedLocationId } from "@/utils/client";
import { Box, Button } from "@mui/material";
import { useState } from "react";

const Tables = () => {
  const { tables, isLoading } = useAppSelector(appData);
  const [open, setOpen] = useState(false);
  const selectedLocationId = getSelectedLocationId() as string;

  const validTables = tables.filter(
    (item) => item.locationId === Number(selectedLocationId)
  );
  return (
    <div className="col-span-5">
      <div className="flex justify-end">
        <Button
          onClick={() => setOpen(true)}
          variant="contained"
          startIcon={<AddIcon />}
        >
          New Table
        </Button>
      </div>
      <div className="flex">
        {validTables.map((item) => (
          <div key={item.id} className="m-3">
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tables;
