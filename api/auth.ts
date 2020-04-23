import { NowRequest, NowResponse } from "@now/node";
import faunadb from "faunadb";

interface User {
  email: string;
  password: string;
}

const getUser = async (email: string): Promise<User | null> => {
  const client = new faunadb.Client({
    secret: process.env.FAUNA_DB_SECRET as string,
  });
  const q = faunadb.query;

  try {
    const result = await client.query(
      q.Get(q.Match(q.Index("users_by_email"), email))
    );
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    return { email: result.data.email, password: result.data.password };
  } catch (e) {
    return null;
  }
};

export default async (
  request: NowRequest,
  response: NowResponse
): Promise<void> => {
  if (request.method !== "POST") {
    response.status(405).send("Method Not Allowed");
    return;
  }

  const { email, password } = request.body;
  const user = await getUser(email);

  if (password != user?.password) {
    response.status(401).send("Invalid username or password");
    return;
  }

  response.setHeader("Set-Cookie", "token=123");
  response.status(200).send("OK");
};
