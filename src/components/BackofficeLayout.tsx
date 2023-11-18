import { Box } from "@mui/material";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchAppData, selectApp } from "@/store/slices/appSlice";
import { useEffect } from "react";

export interface Props {
  children: string | JSX.Element | JSX.Element[];
}
const BackofficeLayout = (props: Props) => {
  const { data } = useSession();
  const { init } = useAppSelector(selectApp);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!init) {
      dispatch(fetchAppData({ locationId: undefined }));
    }
  }, [init, dispatch]);
  return (
    <div>
      <TopBar />
      <div className="grid grid-cols-6 gap-2">
        {data && <SideBar />}
        {props.children}
      </div>
    </div>
  );
};

export default BackofficeLayout;
