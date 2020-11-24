import { NowRequest, NowResponse } from "@now/node";
import faunadb, { query as q } from "faunadb";

type TimestampStatus = [number, string];

export interface LogByTimestampResult {
  data: TimestampStatus[];
}

interface TimeOpenData {
  timeOpen: number;
}

const getLogByTimestamp = async (): Promise<LogByTimestampResult> => {
  const client = new faunadb.Client({
    secret: process.env.FAUNA_DB_SECRET as string,
  });

  return await client.query(
    q.Paginate(q.Match(q.Index("log_by_timestamp_desc")), { size: 10 })
  );
};

const getTimeOpen = async (): Promise<TimeOpenData> => {
  const logs = await getLogByTimestamp();

  const [[, currentStatus], ...olderLogs] = logs.data;
  if (currentStatus === "closed") {
    return { timeOpen: 0 };
  }

  let timeOpen = 1;
  for (const [, status] of olderLogs) {
    if (status === "closed") {
      break;
    }
    timeOpen += 1;
  }

  return { timeOpen };
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

  response.setHeader("Content-Type", "application/json");
  response.status(200).send(JSON.stringify(await getTimeOpen()));
};
