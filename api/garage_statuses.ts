import { NowRequest, NowResponse } from "@now/node";
import faunadb, { query as q } from "faunadb";
import jwt from "jsonwebtoken";
import { LogByTimestampResult } from "./time_open";

const getStatuses = async (): Promise<LogByTimestampResult> => {
  const client = new faunadb.Client({
    secret: process.env.FAUNA_DB_SECRET as string,
  });

  const statuses: LogByTimestampResult = await client.query(
    q.Paginate(q.Match(q.Index("status_by_timestamp_desc")), { size: 20 })
  );

  return statuses;
};

export default async (
  request: NowRequest,
  response: NowResponse
): Promise<void> => {
  if (request.method !== "GET") {
    response.status(405).send("Method Not Allowed");
    return;
  }

  const token = request.cookies.token;

  try {
    jwt.verify(token, process.env.SECRET_KEY as string);
  } catch (err) {
    response.status(401).send({ error: "Invalid token" });
    return;
  }

  response.setHeader("Content-Type", "application/json");
  response.status(200).send(JSON.stringify(await getStatuses()));
};
