import { BooksController } from "@/http/controllers/BooksController";
import { ErrorHandler } from "@/http/middlewares/Errorhandler";
import express from "express";

const booksController = new BooksController();

const router = express.Router();
router.get("/", ErrorHandler.catchErrors(booksController.getBooks));
router.get("/:id", ErrorHandler.catchErrors(booksController.getBook));
router.post(
  "/",
  ErrorHandler.catchErrors(booksController.createBook)
);
router.put(
  "/:id",
  ErrorHandler.catchErrors(booksController.updateBook)
);
router.delete(
  "/:id",
  ErrorHandler.catchErrors(booksController.deleteBook)
);

export default router;