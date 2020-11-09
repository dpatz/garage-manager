import { Server, Response } from "miragejs";
import Cookies from "js-cookie";

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
