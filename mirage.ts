import { Server, Response } from "miragejs";
import Cookies from "js-cookie";

export function makeServer(): Server {
  const server = new Server({
    routes(): void {
      this.post("/api/auth", (_, request) => {
        const json = JSON.parse(request.requestBody);
        if (json.email === "dan@example.com") {
          Cookies.set("token", "123");
          return new Response(200);
        } else {
          return new Response(401, {}, "Invalid username or password");
        }
      });
    },
  });

  return server;
}
