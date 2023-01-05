import express from "express";
import http from "http";
import cors from "cors";
import config from "config";

const app = express();
const server = http.createServer(app);

const port = config.get<string>("port");

app.use(cors());

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

server.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
