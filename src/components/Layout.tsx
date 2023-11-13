import { useRouter } from "next/router";
import BackofficeLayout from "./BackofficeLayout";

interface Props {
  children: string | JSX.Element | JSX.Element[];
}

const Layout = ({ children }: Props) => {
  const router = useRouter();
  const query = router.query;
  const isBackOffice = router.pathname.includes("/backoffice");
  const isOrder = query.locationId && query.tableId;
  if (isBackOffice) {
    return <BackofficeLayout>{children}</BackofficeLayout>;
  }
};

export default Layout;
