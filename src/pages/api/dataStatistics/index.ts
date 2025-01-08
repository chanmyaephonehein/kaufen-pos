import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let status = req.query.status;
  if (status === "1") {
    if (req.method === "POST") {
      const locationId = req.query.locationId;
      const { date } = req.body;

      return res.status(200).send("OK");
    }
  } else if (status === "2") {
  } else if (status === "3") {
  } else if (status === "4") {
  } else if (status === "5") {
  } else {
  }
}
