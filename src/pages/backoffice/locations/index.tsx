import Layout from "@/components/Layout";
import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { Box } from "@mui/material";

const Locations = () => {
  const { locations, isLoading } = useAppSelector(appData);
  return (
    <div className="col-span-5">
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
