import { server } from "./mocks/node";

server.listen();

async function app() {
  const response = await fetch("http://localhost:8080/{offerCode}");
  const data = await response.json();
}

app();
