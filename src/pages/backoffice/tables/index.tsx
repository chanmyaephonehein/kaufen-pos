import Layout from "@/components/Layout";
import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { getSelectedLocationId } from "@/utils/client";
import { Box } from "@mui/material";
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
