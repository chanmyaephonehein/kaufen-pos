import React from "react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Button } from "@mui/material";
import { useRouter } from "next/router";

const AboutUs = () => {
  const router = useRouter();
  return (
    <div className="flex flex-row justify-center items-center gap-8 h-screen">
      <Button variant="outlined" onClick={() => router.push("/backoffice")}>
        Backoffice
      </Button>
      <Button variant="outlined" onClick={() => router.push("/order")}>
        Customer
      </Button>
    </div>
  );
};

export default AboutUs;
