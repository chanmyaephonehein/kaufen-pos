import { Box, Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import React from "react";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  callback: () => void;
  title: string;
}

const DeleteDialog = ({ open, setOpen, callback, title }: Props) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Are you sure you want to delete this {title}?</DialogTitle>
      <DialogContent>This Action can not be undone.</DialogContent>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button sx={{ m: 2 }} variant="outlined" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button
          color="error"
          sx={{ mb: 2, mt: 2, mr: 2 }}
          variant="contained"
          onClick={() => {
            callback();
            setOpen(false);
          }}
        >
          Delete
        </Button>
      </Box>
    </Dialog>
  );
};

export default DeleteDialog;
