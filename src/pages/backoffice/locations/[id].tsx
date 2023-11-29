import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { Box, Button, TextField } from "@mui/material";
import { Locations } from "@prisma/client";
import { useRouter } from "next/router";
import { useState } from "react";

const EditLocation = () => {
  const { locations } = useAppSelector(appData);
  const router = useRouter();
  const locationId = router.query.id as string;
  const location = locations.find(
    (item) => item.id === Number(locationId)
  ) as Locations;
  const [updateLocation, setUpdateLocation] = useState<Locations>(location);
  return (
    <Box>
      <TextField
        sx={{ mt: 2 }}
        label="Location"
        value={updateLocation?.name}
        onChange={(e) =>
          setUpdateLocation({ ...updateLocation, name: e.target.value })
        }
      />
      <TextField
        sx={{ my: 2 }}
        label="Address"
        value={updateLocation?.address}
        onChange={(e) =>
          setUpdateLocation({ ...updateLocation, address: e.target.value })
        }
      />
      <Button variant="contained" sx={{ width: "fit-content" }}>
        Update
      </Button>
    </Box>
  );
};

export default EditLocation;
