import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ReviewDialog from "./ReviewDialog";

export interface ClientReviews {
  id: number;
  reviews: string;
  image?: string;
  name: string;
  account: string;
}

const clientReviews: ClientReviews[] = [
  {
    id: 1,
    reviews:
      "Laborum quis quam. Dolorum enumquam delectus nihil. Aut enim doloremque et ipsam.",
    image: "",
    name: "Chan Myae Phone Hein",
    account: "@jayson",
  },
  {
    id: 2,
    reviews:
      "Imontes vitae auctor libero. Hac condimentum dignissim nibh vulputate ut nunc. Amet nibh orci mi venenatis blandit vel et it in vel ac diam.",
    image: "",
    name: "May Phyu Han Khin",
    account: "@kyra",
  },
  {
    id: 3,
    reviews:
      "Molestias ea earum quos nostrum dolo incidunt excepturi rerum voluptatem minus harum.",
    image: "",
    name: "Min Phone Myat",
    account: "@bruce",
  },
  {
    id: 4,
    reviews:
      "Aut reprehenderit olestiae ipsam ut officia rem nulla blanditiis.",
    image: "",
    name: "Htet Naung Htun",
    account: "@tonetonelay",
  },
  {
    id: 5,
    reviews:
      "Voluptas quos itaqrepudiandae. Earum deserunt enim molestiae ipsum saepe corrupti.",
    image: "",
    name: "Ye Khant",
    account: "@cow",
  },
];

const Clients = () => {
  const threeReviewers = clientReviews.slice(0, 3);
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="flex flex-col items-center py-10 gap-6 text-white lg:mx-32 md:mx-16 mx-3">
      <p>Testimonails</p>
      <p className="mx-auto max-w-xl text-center text-3xl">
        We have worked with thousands of amazing people
      </p>
      <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 w-full min-h-52 max-h-fit">
        {threeReviewers.map((item) => (
          <div
            key={item.id}
            className="bg-gray-900 rounded-xl p-6 flex flex-col justify-between gap-10"
          >
            <div className="text-sm">
              <span>{item.reviews}</span>
            </div>
            <div className="flex flex-row items-center gap-5">
              {item.image ? (
                <img src={item.image} alt="Reviewer" />
              ) : (
                <AccountCircleIcon style={{ fontSize: "2rem" }} />
              )}
              <div className="flex flex-col">
                <p>{item.name}</p>
                <p className="text-gray-500">{item.account}</p>
              </div>
            </div>
          </div>
        ))}

        <div
          onClick={() => setOpen(true)}
          className="bg-gray-900 cursor-pointer rounded-xl p-6 flex flex-row justify-center items-center  transition ease-in-out delay-100 duration-200  hover:bg-gray-800 "
        >
          <div className="animate-bounce flex flex-col items-center">
            <MoreHorizIcon /> <p>More</p>
          </div>
        </div>
      </div>
      <ReviewDialog open={open} setOpen={setOpen} data={clientReviews} />
    </div>
  );
};

export default Clients;
