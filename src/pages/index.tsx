import { Button } from "@mui/material";
import { useRouter } from "next/router";

const Kaufen = () => {
  const router = useRouter();
  return (
    <>
      <Button variant="outlined" onClick={() => router.push("/backoffice")}>
        Backoffice
      </Button>
      <h1>ok</h1>
    </>
  );
};

export default Kaufen;
