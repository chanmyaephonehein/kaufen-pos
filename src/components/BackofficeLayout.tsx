import { Box } from "@mui/material";
import SideBar from "./SideBar";

export interface Props {
  children: string | JSX.Element | JSX.Element[];
}
const BackofficeLayout = (props: Props) => {
  return (
    <Box>
      <SideBar />
      <Box>{props.children}</Box>
    </Box>
  );
};

export default BackofficeLayout;
