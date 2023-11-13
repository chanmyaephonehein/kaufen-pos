import { useRouter } from "next/router";

const BackofficeApp = () => {
  const router = useRouter();
  return (
    <div>
      <div>Welcome to backoffice</div>
      <button onClick={() => router.push("/backoffice/orders")}>
        Click here for more about backoffice
      </button>
    </div>
  );
};

export default BackofficeApp;
