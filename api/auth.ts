import { NowRequest, NowResponse } from "@now/node";
import faunadb from "faunadb";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

interface User {
  email: string;
  password: string;
}

interface UserResult {
  data: User;
}

const getUser = async (email: string): Promise<User | null> => {
  const client = new faunadb.Client({
    secret: process.env.FAUNA_DB_SECRET as string,
  });
  const q = faunadb.query;

  try {
    const result: UserResult = await client.query(
      q.Get(q.Match(q.Index("users_by_email"), email))
    );
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
  const isPasswordCorrect = await bcrypt.compare(
    password,
    user?.password || ""
  );

  if (!user?.password || !isPasswordCorrect) {
    response.status(401).send("Invalid username or password");
    return;
  }

  const token = jwt.sign({ email: "email" }, process.env.SECRET_KEY as string);
  const cookieParams = [`token=${token}`, "Path=/", "Secure"].filter(
    (param) => param !== "Secure" || process.env.NODE_ENV !== "development"
  );

  response.setHeader("Set-Cookie", cookieParams.join("; "));
  response.status(200).send("OK");
};
