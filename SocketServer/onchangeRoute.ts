import express, { Request, Response } from "express";

let data = "xyz";
const onchangeRouter = express.Router();
onchangeRouter.get("/data", (req: Request, res: Response) => {
  res.status(200).json({ data: data });
});

onchangeRouter.post("/data", (req: Request, res: Response) => {
  const extracted = req.body.data;
  console.log(extracted);
  data = extracted;
  res.status(201).send("data updated");
});

export default onchangeRouter
