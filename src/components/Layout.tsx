import { useRouter } from "next/router";
import BackofficeLayout from "./BackofficeLayout";

interface Props {
  children: string | JSX.Element | JSX.Element[];
}

const Layout = ({ children }: Props) => {
  const router = useRouter();
  const query = router.query;
  const isBackOffice =
    router.pathname.includes("/backoffice") ||
    router.pathname.includes("/auth");
  const isOrder = query.locationId && query.tableId;
  if (isBackOffice) {
    return (
      <div>
        <BackofficeLayout>{children}</BackofficeLayout>
      </div>
    );
  }
};

export default Layout;
