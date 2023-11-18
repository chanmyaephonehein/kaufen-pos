import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const BackofficeApp = () => {
  const router = useRouter();
  const { data, status } = useSession();
  const { isLoading } = useAppSelector(appData);

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/backoffice/orders");
    }
    if (status !== "loading" && status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [data, router, status]);

  if (isLoading) return null;
  return null;
};

export default BackofficeApp;
