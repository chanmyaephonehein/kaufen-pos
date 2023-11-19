import Layout from "@/components/Layout";
import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { getSelectedLocationId } from "@/utils/client";
import { Box } from "@mui/material";

const Settings = () => {
  const { locations, isLoading } = useAppSelector(appData);
  const locationId = getSelectedLocationId() as string;
  const validLocation = locations.find(
    (item) => item.id === Number(locationId)
  );
  return (
    <div>
      <div>{validLocation?.name}</div>
    </div>
  );
};

export default Settings;
