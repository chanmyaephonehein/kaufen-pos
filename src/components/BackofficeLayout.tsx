import { Box } from "@mui/material";
import SideBar from "./SideBar";
import TopBar from "./TopBar";

export interface Props {
  children: string | JSX.Element | JSX.Element[];
}
const BackofficeLayout = (props: Props) => {
  return (
    <div>
      <TopBar />
      <div className="grid grid-cols-6 gap-2">
        <SideBar />
        {props.children}
      </div>
    </div>
  );
};

export default BackofficeLayout;
