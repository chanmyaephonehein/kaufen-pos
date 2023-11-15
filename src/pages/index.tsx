import { Button } from "@mui/material";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <Button variant="outlined" onClick={() => router.push("/backoffice")}>
        Backoffice
      </Button>
    </>
  );
}
