import React from "react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Button } from "@mui/material";
import { useRouter } from "next/router";

const AboutUs = () => {
  const router = useRouter();
  return (
    <div className="sm:mx-16 lg:32 mx-3 flex flex-row text-white justify-center items-center py-20">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="cursor-pointer py-1 px-2 border-2 border-gray-700 rounded-xl hover:border-gray-500">
          <span className="text-gray-300 text-sm">Innovating our ideas.</span>
          <span className="font-bold text-whtie text-sm"> Read More</span>
          <ArrowRightAltIcon />
        </div>
        <p className="text-center max-w-2xl mx-auto md:text-3xl xl:text-3xl text-2xl font-bold">
          Kaufen POS
        </p>
        <p className="text-center text-md max-w-2xl mx-auto leading-8 text-gray-300 text-xl">
          Modern Restaurant with POS
        </p>
        <div className="flex flex-row justify-center items-center gap-8">
          <Button variant="outlined" onClick={() => router.push("/backoffice")}>
            Backoffice
          </Button>
          <Button variant="outlined" onClick={() => router.push("/order")}>
            Customer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
