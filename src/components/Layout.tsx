import { useRouter } from "next/router";
import BackofficeLayout from "./BackofficeLayout";
import OrderLayout from "./OrderLayout";

interface Props {
  children: string | JSX.Element | JSX.Element[];
}

const Layout = ({ children }: Props) => {
  const router = useRouter();
  const query = router.query;
  const isBackOffice = router.pathname.includes("/backoffice");
  const isOrder = query.locationId && query.tableId;
  if (isBackOffice) {
    return (
      <div>
        <BackofficeLayout>{children}</BackofficeLayout>
      </div>
    );
  }
  if (isOrder) {
    return (
      <div>
        <OrderLayout>{children}</OrderLayout>
      </div>
    );
  }
  return <>{children}</>;
};

export default Layout;
