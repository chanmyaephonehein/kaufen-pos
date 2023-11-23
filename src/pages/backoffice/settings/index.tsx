import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { getSelectedLocationId } from "@/utils/client";
import { Box } from "@mui/material";
import { Locations } from "@prisma/client";
import { useEffect, useState } from "react";

const Settings = () => {
  const { locations, isLoading } = useAppSelector(appData);
  const locationId = getSelectedLocationId() as string;
  const [validLocation, setValidLocation] = useState<Locations>();
  useEffect(() => {
    if (locations.length) {
      const selectedLocationId = getSelectedLocationId() as string;
      if (selectedLocationId) {
        const selectedLocation = locations.find(
          (item) => item.id === Number(selectedLocationId)
        );
        setValidLocation(selectedLocation);
      } else {
        localStorage.setItem("selectedLocationId", String(locations[0].id));
        setValidLocation(locations[0]);
      }
    }
  }, [locations]);
  // const validLocation = locations.find(
  //   (item) => item.id === Number(locationId)
  // );
  if (isLoading) return <Loading />;
  return (
    <div>
      <div>{validLocation?.name}</div>
    </div>
  );
};

export default Settings;
