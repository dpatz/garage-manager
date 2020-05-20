import { NowRequest, NowResponse } from "@now/node";
import fetch from "node-fetch";

export default async (
  request: NowRequest,
  response: NowResponse
): Promise<void> => {
  if (request.method !== "GET") {
    response.status(405).send("Method Not Allowed");
    return;
  }

  if (!process.env.BASE_GARAGE_URL) {
    throw "BASE_GARAGE_URL is not configured";
  }

  const garageStatusResponse = await fetch(process.env.BASE_GARAGE_URL);
  const { is_open: isOpen } = await garageStatusResponse.json();

  response.setHeader("Content-Type", "application/json");
  response.status(200).send(JSON.stringify({ isOpen: isOpen }));
};
