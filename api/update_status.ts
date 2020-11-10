import { NowRequest, NowResponse } from "@now/node";
import faunadb, { query as q } from "faunadb";
import { isGarageOpen } from "./garage_status";

interface GarageStatus {
  status: string;
}

interface GarageStatusResult {
  data: GarageStatus;
  ts: number;
}

const updateStatus = async (status: string): Promise<GarageStatusResult> => {
  const client = new faunadb.Client({
    secret: process.env.FAUNA_DB_SECRET as string,
  });

  return await client.query(
    q.Create(q.Collection("GarageStatus"), {
      data: { status },
    })
  );
};

export default async (
  request: NowRequest,
  response: NowResponse
): Promise<void> => {
  if (request.method !== "GET") {
    response.status(405).send("Method Not Allowed");
    return;
  }

  const { secret } = request.query;

  if (secret !== process.env.UPDATE_STATUS_SECRET) {
    response.status(403).send("Invalid secret");
    return;
  }

  const isOpen = await isGarageOpen();

  await updateStatus(isOpen ? "open" : "closed");

  response.status(200).send("OK");
};
