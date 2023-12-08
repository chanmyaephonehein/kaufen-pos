import { AddCircle, RemoveCircle } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";

interface Props {
  value: number;
  increase: () => void;
  decrease: () => void;
}

const QuantitySelector = ({ value, increase, decrease }: Props) => {
  return (
    <div className="flex items-center">
      <IconButton color="primary" onClick={decrease}>
        <RemoveCircle />
      </IconButton>
      <Typography>{value}</Typography>
      <IconButton>
        <AddCircle color="primary" onClick={increase} />
      </IconButton>
    </div>
  );
};

export default QuantitySelector;
