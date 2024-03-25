import express from "express";
import todoRoutes from "./routes";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

async function startTodoServer() {
  try {
    const app = express();
    const server = http.createServer(app);

    const io = new Server(server, {
      cors: {
        origin: "http://localhost:5173",
        credentials: true,
      },
    });
    io.on("connection", (socket) => {
      console.log(`a user connected ${socket.id}`);

      socket.on("send_message", (data) => {
        socket.broadcast.emit("receive_message", data);
      });
    });
    const port = 8000;

    app.use(cors());
    app.use(express.json());

    app.get("/", (req, res) => {
      res.send({ message: "todo api" });
    });
    app.use("/todo", todoRoutes);
    app.listen(port, () => {
      console.log(`app is running on ${port} port`);
    });
  } catch (err) {
    console.log(err);
  }
}
startTodoServer();
// npx autocannon -c 4 -d 10 localhost:7001
// const disableConsole = () => {
//   if (process.env.NODE_ENV === "prod") {
//     function resetLogs() {}
//     console.log = resetLogs;
//     console.warn = resetLogs;
//     console.error = resetLogs;
//   }
// };
