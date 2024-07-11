import bodyParser from "body-parser";
import cors from "cors";
import express, { Express, NextFunction, Request, Response } from "express";
import "reflect-metadata";

import authorsRoutes from "./routes/author";
import booksRoutes from "./routes/book";
import { ErrorHandler } from "./http/middlewares/Errorhandler";

const app: Express = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/authors", authorsRoutes);
app.use("/books", booksRoutes);

app.all("*", (req: Request, res: Response) => {
  return res.status(404).send({
    success: false,
    message: "Invalid route",
  });
});

// Define a middleware function to handle errors
app.use(ErrorHandler.handleErrors)


export default app;