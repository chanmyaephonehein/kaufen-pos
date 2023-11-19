import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";

const Orders = () => {
  const { isLoading } = useAppSelector(appData);
  if (isLoading) return <Loading />;
  return (
    <div className="col-span-5">
      <h3 className="bg-red-200">BackOffice Orders</h3>
    </div>
  );
};

export default Orders;
