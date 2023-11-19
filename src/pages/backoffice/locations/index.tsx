import AddIcon from "@mui/icons-material/Add";
import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import Loading from "@/components/Loading";
import ItemCard from "@/components/ItemCard";
import LocationOnIcon from "@mui/icons-material/LocationOn";

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
      <div>
        {locations.map((item) => (
          <ItemCard
            key={item.id}
            href={`backoffice/locations/${item.id}`}
            title={item.name}
            icon={<LocationOnIcon sx={{ my: 3, fontSize: 60 }} />}
          />
        ))}
      </div>
    </div>
  );
};

export default Locations;
