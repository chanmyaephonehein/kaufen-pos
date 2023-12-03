import Loading from "@/components/Loading";
import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { getSelectedLocationId } from "@/utils/client";
import {
  Box,
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { Companies, Locations } from "@prisma/client";
import { useEffect, useState } from "react";

const Settings = () => {
  const { locations, isLoading, company } = useAppSelector(appData);
  const locationId = getSelectedLocationId() as string;
  const [validLocation, setValidLocation] = useState<Locations>();
  const [updateCompany, setUpdateCompany] = useState<Companies>(
    company as Companies
  );

  const handleOnChange = (e: SelectChangeEvent<number>) => {
    localStorage.setItem("selectedLocationId", String(e.target.value));
    const selectedLocation = locations.find(
      (item) => item.id == Number(e.target.value)
    );
    setValidLocation(selectedLocation);
  };

  useEffect(() => {
    if (locations.length) {
      if (locationId) {
        const selectedLocation = locations.find(
          (item) => item.id === Number(locationId)
        );
        setValidLocation(selectedLocation);
      } else {
        localStorage.setItem("selectedLocationId", String(locations[0].id));
        setValidLocation(locations[0]);
      }
    }
  }, [locations]);

  if (isLoading) return <Loading />;
  return (
    <div>
      <TextField
        label="Company Name"
        sx={{ mt: 1 }}
        value={updateCompany?.name}
        onChange={(e) =>
          setUpdateCompany({ ...updateCompany, name: e.target.value })
        }
      />
      <TextField
        label="Company Address"
        sx={{ my: 2 }}
        value={updateCompany?.address}
        onChange={(e) =>
          setUpdateCompany({ ...updateCompany, address: e.target.value })
        }
      />
      <Button variant="contained">Update</Button>
      <Typography sx={{ my: 2 }} variant="h5">
        Location Update
      </Typography>
      <Select
        label="Locations"
        value={validLocation ? validLocation.id : ""}
        onChange={handleOnChange}
      >
        {locations.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default Settings;
