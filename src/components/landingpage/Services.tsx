import { Typography } from "@mui/material";
import React from "react";
import DoneIcon from "@mui/icons-material/Done";

interface Options {
  offer: string;
  level?: string;
  description: string;
  privilege: string[];
}

interface ContentServices {
  title: string;
  contentTitle: string;
  content: string;
  options: Options[];
}

const contentServices: ContentServices = {
  title: "Services",
  contentTitle: "Business services to fit all sizes",
  content:
    "Select an service with top features to engage your audience, build customer loyalty, and boost sales, offered by our consulting and development services.asdda",
  options: [
    {
      offer: "Development",
      description:
        "Customizable and scalable web and software development for your needs",
      privilege: [
        "Website Development",
        "Mobile App Development",
        "E-commerce Development",
        "Search Engine Optimization",
      ],
    },
    {
      offer: "Solutions",
      level: "Enterprise",
      description: "Software that scale up your business rapidly",
      privilege: [
        "Ticket Management System",
        "Learning Management System",
        "Attendant Management System",
        "Human Resource Management System",
        "Customer Support Management System",
      ],
    },
    {
      offer: "Consulting",
      description: "Dedicated consulting for your business",
      privilege: [
        "Architecture and design",
        "Project planning and management",
        "Requirements gathering and analysis",
        "Technology assessment and selection",
        "Maintenance and support",
      ],
    },
  ],
};

const Services = () => {
  return (
    <div className="w-full bg-gray-800 h-full py-10">
      <div className="flex flex-col gap-6 text-white items-center lg:mx-32 md:mx-16 mx-3">
        <p className="text-xl">{contentServices.title}</p>
        <Typography variant="h3" sx={{ textAlign: "center" }}>
          {contentServices.contentTitle}
        </Typography>
        <div className="mx-auto max-w-2xl text-center leading-8">
          {contentServices.content}
        </div>
        <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-6 w-full min-h-64 ">
          {contentServices.options.map((item) => (
            <div
              key={item.offer}
              className={
                item.level
                  ? "p-10 border-2 border-blue-400 rounded-2xl col-span-1"
                  : "p-10 border-2 border-gray-600 rounded-2xl col-span-1"
              }
            >
              <div
                className={
                  item.level
                    ? "flex flex-row justify-between items-center "
                    : ""
                }
              >
                <p className="font-bold text-lg">{item.offer}</p>
                {item.level && (
                  <p className="px-4 py-1 rounded-2xl bg-blue-600 text-white">
                    {item.level}
                  </p>
                )}
              </div>
              <p className="leading-8 my-8">{item.description}</p>
              <div>
                {item.privilege.map((i) => (
                  <div key={i} className="flex leading-8">
                    <DoneIcon />
                    <p className="ml-3">{i}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
