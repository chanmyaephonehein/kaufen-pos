import { Box } from "@mui/material";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appData, fetchAppData, selectApp } from "@/store/slices/appSlice";
import { useEffect } from "react";
import Loading from "./Loading";

interface Props {
  children: string | JSX.Element | JSX.Element[];
}
const BackofficeLayout = (props: Props) => {
  const { data } = useSession();
  const { init } = useAppSelector(selectApp);
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(appData);

  useEffect(() => {
    if (!init) {
      dispatch(fetchAppData({ locationId: undefined }));
    }
  }, [init, dispatch]);
  if (isLoading) return <Loading />;
  return (
    <div>
      <TopBar />
      <div className="grid grid-cols-6 gap-2">
        {data && <SideBar />}
        <div className="col-span-5">{props.children}</div>
      </div>
    </div>
  );
};

export default BackofficeLayout;
