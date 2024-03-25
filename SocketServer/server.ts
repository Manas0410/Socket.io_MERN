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
        origin: "*",
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

    app.use(cors()); // Enable CORS for all routes
    app.use(express.json());

    app.get("/", (req, res) => {
      res.send({ message: "todo api" });
    });
    app.use("/todo", todoRoutes);

    server.listen(port, () => {
      console.log(`app is running on ${port} port`);
    });
  } catch (err) {
    console.log(err);
  }
}
startTodoServer();
