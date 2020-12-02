import { Server, Response } from "miragejs";
import Cookies from "js-cookie";
import dayjs from "dayjs";

export function makeServer(): Server {
  const server = new Server({
    routes(): void {
      this.passthrough("/_next/static/development/_devPagesManifest.json");

      this.post("/api/auth", (_, request) => {
        const json = JSON.parse(request.requestBody);
        if (json.email === "dan@example.com") {
          Cookies.set("token", "123");
          return new Response(200);
        } else {
          return new Response(401, {}, "Invalid username or password");
        }
      });
      this.get(
        "/api/garage_status",
        () => {
          return new Response(
            200,
            { "Content-Type": "application/json" },
            JSON.stringify({ isOpen: true })
          );
        },
        { timing: 3000 }
      );
      this.get(
        "/api/garage_statuses",
        () => {
          return new Response(
            200,
            { "Content-Type": "application/json" },
            JSON.stringify({
              data: [
                [dayjs().unix() * 1000000, "open"],
                [dayjs().subtract(4, "hour").unix() * 1000000, "closed"],
                [dayjs().subtract(5, "hour").unix() * 1000000, "open"],
                [dayjs().subtract(1, "day").unix() * 1000000, "closed"],
                [
                  dayjs().subtract(1, "day").subtract(2, "hour").unix() *
                    1000000,
                  "open",
                ],
                [
                  dayjs().subtract(2, "day").subtract(3, "hour").unix() *
                    1000000,
                  "closed",
                ],
                [
                  dayjs().subtract(2, "day").subtract(4, "hour").unix() *
                    1000000,
                  "open",
                ],
                [
                  dayjs().subtract(4, "day").add(3, "hour").unix() * 1000000,
                  "closed",
                ],
                [
                  dayjs().subtract(4, "day").add(2, "hour").unix() * 1000000,
                  "open",
                ],
                [
                  dayjs().subtract(5, "day").add(3, "hour").unix() * 1000000,
                  "closed",
                ],
                [
                  dayjs().subtract(5, "day").add(2, "hour").unix() * 1000000,
                  "open",
                ],
              ],
            })
          );
        },
        { timing: 3000 }
      );
      this.get(
        "/api/garage_toggle",
        () => {
          return new Response(200, {}, "OK");
        },
        { timing: 3000 }
      );
    },
  });

  return server;
}
