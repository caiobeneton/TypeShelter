import express, { json, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config()

const app = express();

app.use(json())

app.get("/ping", (req: Request, res: Response) => res.send("pong"));

const port: string | number = process.env.PORT || 4000
app.listen(port, () => console.log(`Server running in port ${port}`))