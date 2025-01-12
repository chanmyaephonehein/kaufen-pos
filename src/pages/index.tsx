import AboutUs from "@/components/landingpage/AboutUs";
import Clients from "@/components/landingpage/Clients";
import Contact from "@/components/landingpage/Contact";
import Faq from "@/components/landingpage/Faq";
import Footer from "@/components/landingpage/Footer";
import Services from "@/components/landingpage/Services";
import { Button } from "@mui/material";
import { useRouter } from "next/router";

const Kaufen = () => {
  const router = useRouter();
  return (
    <>
      <div className="">
        <div className="flex flex-col gap-6">
          <AboutUs />
        </div>
      </div>
    </>
  );
};

export default Kaufen;
