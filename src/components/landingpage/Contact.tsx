import { Button, TextField } from "@mui/material";
import React, { ReactNode, useState } from "react";
import DomainIcon from "@mui/icons-material/Domain";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

interface MessageData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  message: string;
}

interface ContactInfo {
  icon: ReactNode;
  text: string;
}

const contactInfo: ContactInfo[] = [
  {
    icon: <DomainIcon />,
    text: "Yangon, Myanmar",
  },
  {
    icon: <PhoneIcon />,
    text: "+959 1234 567",
  },
  {
    icon: <EmailIcon />,
    text: "hello@cybermm.tech",
  },
];
const Contact = () => {
  const [messageData, setMessageData] = useState<MessageData>({
    firstName: "",
    lastName: "string",
    email: "",
    phoneNumber: "",
    message: "",
  });
  // console.log(messageData);
  return (
    <div className="lg:mx-32 sm:mx-14 mx-3 text-white py-10">
      <div className="grid xl:grid-cols-2 grid-cols-1 gap-10 w-full">
        <div className="col-span-1 bg-gradient-to-b from-gray-700 to-gray-900 xl:h-[100vh] p-10 flex flex-col justify-center items-start ">
          <p className="text-3xl font-bold mb-3">Get in touch</p>
          <p className="leading-7 text-lg mb-10">
            Getting in touch with us is easy. Whether you prefer to call, email
            or use our live chat feature, we are always available to answer your
            questions, provide technical support, or discuss any issues or
            concerns you may have.
          </p>
          <div className="leading-10 ">
            {contactInfo.map((item) => (
              <div className="flex items-center " key={item.text}>
                {item.icon}
                <p className="ml-4">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="col-span-1 grid grid-cols-2 gap-5 w-full leading-8">
            <div className="flex flex-col">
              <p>First Name</p>
              <TextField
                onChange={(e) =>
                  setMessageData({ ...messageData, firstName: e.target.value })
                }
                style={{ backgroundColor: "#2d3748", borderRadius: "7px" }}
                variant="outlined"
                multiline
                InputProps={{
                  style: { color: "white" },
                }}
              />
            </div>
            <div className="flex flex-col ">
              <p>Last Name</p>
              <TextField
                onChange={(e) =>
                  setMessageData({ ...messageData, lastName: e.target.value })
                }
                style={{ backgroundColor: "#2d3748", borderRadius: "7px" }}
                variant="outlined"
                InputProps={{
                  style: { color: "white" },
                }}
              />
            </div>
            <div className="flex flex-col col-span-2">
              <p>Email</p>
              <TextField
                onChange={(e) =>
                  setMessageData({ ...messageData, email: e.target.value })
                }
                style={{ backgroundColor: "#2d3748", borderRadius: "7px" }}
                variant="outlined"
                InputProps={{
                  style: { color: "white" },
                }}
              />
            </div>
            <div className="flex flex-col col-span-2">
              <p>Phone number</p>
              <TextField
                onChange={(e) =>
                  setMessageData({
                    ...messageData,
                    phoneNumber: e.target.value,
                  })
                }
                style={{ backgroundColor: "#2d3748", borderRadius: "7px" }}
                variant="outlined"
                InputProps={{
                  style: { color: "white" },
                }}
              />
            </div>
            <div className="flex flex-col col-span-2">
              <p>Message</p>
              <TextField
                onChange={(e) =>
                  setMessageData({ ...messageData, message: e.target.value })
                }
                multiline
                style={{ backgroundColor: "#2d3748", borderRadius: "7px" }}
                variant="outlined"
                InputProps={{
                  style: { color: "white" },
                }}
              />
            </div>
            <div className="col-span-2 flex justify-end">
              <Button
                variant="outlined"
                onClick={() => {
                  console.log("ok");
                }}
              >
                Send message
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
