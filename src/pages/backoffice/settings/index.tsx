import Loading from "@/components/Loading";
import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { getSelectedLocationId } from "@/utils/client";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
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
      const selectedLocationId = getSelectedLocationId() as string;
      if (!selectedLocationId) {
        localStorage.setItem("selectedLocationId", String(locations[0].id));
        setValidLocation(locations[0]);
      } else {
        const selectedLocation = locations.find(
          (item) => item.id === Number(selectedLocationId)
        );
        setValidLocation(selectedLocation);
      }
    }
  }, [locations, validLocation]);

  if (isLoading) return <Loading />;
  return (
    <div className="flex flex-col max-w-[400px]">
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
      <Button variant="contained" sx={{ width: "fit-content" }}>
        Update
      </Button>
      <Typography sx={{ my: 2 }} variant="h5">
        Location Update
      </Typography>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Locations</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
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
      </FormControl>
    </div>
  );
};

export default Settings;
