import AddIcon from "@mui/icons-material/Add";
import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import Loading from "@/components/Loading";
import ItemCard from "@/components/ItemCard";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import NewLocation from "./NewLocation";

const Locations = () => {
  const { locations, isLoading } = useAppSelector(appData);
  const [open, setOpen] = useState(false);
  if (isLoading) return <Loading />;
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
      <div className="flex flex-row flex-wrap">
        {locations.map((item) => (
          <ItemCard
            key={item.id}
            href={`/backoffice/locations/${item.id}`}
            title={item.name}
            icon={<LocationOnIcon sx={{ my: 3, fontSize: 60 }} />}
          />
        ))}
      </div>
      <NewLocation open={open} setOpen={setOpen} />
    </div>
  );
};

export default Locations;
