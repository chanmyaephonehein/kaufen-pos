import { Box } from "@mui/material";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appData, fetchAppData, selectApp } from "@/store/slices/appSlice";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import { getSelectedLocationId } from "@/utils/client";

interface Props {
  children: string | JSX.Element | JSX.Element[];
}
const BackofficeLayout = (props: Props) => {
  const { data } = useSession();
  const { init } = useAppSelector(selectApp);
  const dispatch = useAppDispatch();
  const { isLoading, locations } = useAppSelector(appData);
  const [currentLocation, setCurrentLocation] = useState<string>("No");
  const findLocation = () => {
    const locationId = getSelectedLocationId() as string;
    const result = locations.find(
      (item) => item.id === parseInt(locationId, 10)
    );
    setCurrentLocation(` ${result?.name}, ${result?.address} ` || "");
  };
  useEffect(() => {
    if (!init) {
      dispatch(fetchAppData({ locationId: undefined }));
    }
  }, [init, dispatch]);

  useEffect(() => {
    findLocation();
  }, [init]);
  if (isLoading) return <Loading />;
  return (
    <div>
      <TopBar location={currentLocation} />
      <div className="grid grid-cols-6 gap-1">
        {data && <SideBar />}
        <div className="col-span-5">{props.children}</div>
      </div>
    </div>
  );
};

export default BackofficeLayout;
