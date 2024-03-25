import express, { Request, Response } from "express";
import todoData from "./data";

const Router = express.Router();
Router.get("/data/:id", (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (id) {
      const item = todoData.find((i) => i.id === id);
      res.status(200).json(item);
    } else {
      res.status(400).json({ message: "invalid id" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "internal server error" });
  }
});
Router.get("/data", (req: Request, res: Response) => {
  try {
    res.status(200).json(todoData);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "internal server error" });
  }
});
Router.post("/data", (req: Request, res: Response) => {
  try {
    const { id, work } = req.body;
    if (!id || !work) {
      res.status(400).json({ message: "invalid data" });
      return;
    }
    const newData = { id, work };
    todoData.push(newData);
    res.status(200).json({ message: "updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "internal server error" });
  }
});

export default Router;
