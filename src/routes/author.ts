import { AuthorsController } from "@/http/controllers/AuthorsController";
import { ErrorHandler } from "@/http/middlewares/Errorhandler";
import express from "express";

const authorsController = new AuthorsController();

const router = express.Router();

router.get("/", ErrorHandler.catchErrors(authorsController.getAuthors));
router.get("/:id", ErrorHandler.catchErrors(authorsController.getAuthor));
router.post(
  "/",
  ErrorHandler.catchErrors(authorsController.createAuthor)
);
router.put(
  "/:id",
  ErrorHandler.catchErrors(authorsController.updateAuthor)
);
router.delete(
  "/:id",
  ErrorHandler.catchErrors(authorsController.deleteAuthor)
);

export default router;