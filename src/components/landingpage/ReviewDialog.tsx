import { Dialog, DialogContent, DialogTitle, Grid } from "@mui/material";
import React from "react";
import { ClientReviews } from "./Clients";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  data: ClientReviews[];
}

const ReviewDialog = ({ open, setOpen, data }: Props) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <div className="flex flex-col p-4 bg-gradient-to-r from-gray-700 to-gray-900">
        <div className="flex flex-row flex-wrap gap-3 text-white overflow-y  ">
          {data.map((item) => (
            <div
              key={item.id}
              className="bg-gray-900 rounded-xl p-6 flex flex-col justify-between w-64 min-h-64"
            >
              <div className="text-sm">
                <span>{item.reviews}</span>
              </div>
              <div className="flex flex-row items-center gap-5">
                {item.image ? (
                  <img src={item.image} alt="Reviewer" />
                ) : (
                  <AccountCircleIcon style={{ fontSize: "2rem" }} />
                )}
                <div className="flex flex-col">
                  <p>{item.name}</p>
                  <p className="text-gray-500">{item.account}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Dialog>
  );
};

export default ReviewDialog;
