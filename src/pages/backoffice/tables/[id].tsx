import { config } from "@/config";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { updateTable } from "@/store/slices/tablesSlice";
import { Box, Button, TextField } from "@mui/material";
import { Tables } from "@prisma/client";
import { useRouter } from "next/router";
import { useState } from "react";

const EditTable = () => {
  const dispatch = useAppDispatch();
  const { tables } = useAppSelector(appData);
  const router = useRouter();
  const tableId = router.query.id as string;
  const table = tables.find((item) => item.id === Number(tableId)) as Tables;
  const [updatedTable, setUpdatedTable] = useState<Tables>(table);
  const handleUpdateTable = async () => {
    const response = await fetch(`${config.apiBaseUrl}/tables`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTable),
    });
    const table = await response.json();
    dispatch(updateTable(table));
    router.push({ pathname: "/backoffice/tables" });
  };
  return (
    <Box>
      <TextField
        sx={{ my: 3 }}
        label="Table"
        value={updatedTable?.name}
        onChange={(e) =>
          setUpdatedTable({ ...updatedTable, name: e.target.value })
        }
      />
      <Button onClick={handleUpdateTable} variant="contained">
        Update
      </Button>
    </Box>
  );
};

export default EditTable;
