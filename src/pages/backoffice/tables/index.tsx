import AddIcon from "@mui/icons-material/Add";
import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { getSelectedLocationId } from "@/utils/client";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import Loading from "@/components/Loading";
import ItemCard from "@/components/ItemCard";
import TableBarIcon from "@mui/icons-material/TableBar";
import NewTable from "./NewTable";

const Tables = () => {
  const { tables, isLoading } = useAppSelector(appData);
  const [open, setOpen] = useState(false);
  const selectedLocationId = getSelectedLocationId() as string;

  const validTables = tables.filter(
    (item) => item.locationId === Number(selectedLocationId)
  );
  if (isLoading) return <Loading />;
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
          <ItemCard
            key={item.id}
            href={`backoffice/tables/${item.id}`}
            title={item.name}
            icon={<TableBarIcon sx={{ my: 3, fontSize: 60 }} />}
          />
        ))}
      </div>
      <NewTable open={open} setOpen={setOpen} />
    </div>
  );
};

export default Tables;
