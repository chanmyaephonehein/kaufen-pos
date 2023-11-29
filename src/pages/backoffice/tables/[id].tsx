import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { Box, Button, TextField } from "@mui/material";
import { Tables } from "@prisma/client";
import { useRouter } from "next/router";
import { useState } from "react";

const EditTable = () => {
  const { tables } = useAppSelector(appData);
  const router = useRouter();
  const tableId = router.query.id as string;
  const table = tables.find((item) => item.id === Number(tableId)) as Tables;
  const [updateTable, setUpdateTable] = useState<Tables>(table);

  return (
    <Box>
      <TextField
        sx={{ my: 3 }}
        label="Table"
        value={updateTable.name}
        onChange={(e) =>
          setUpdateTable({ ...updateTable, name: e.target.value })
        }
      />
      <Button variant="contained">Update</Button>
    </Box>
  );
};

export default EditTable;
