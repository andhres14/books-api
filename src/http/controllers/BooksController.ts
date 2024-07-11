import { Request, Response } from "express";
import { AppDataSource } from "@/database/data-source";
import { Book } from "@/database/entities/Book";
import { ResponseUtil } from "@/utils/Response";
import { CreateBookDTO, UpdateBookDTO } from "../dtos/BookDTO";
import { validate, validateOrReject } from "class-validator";
import { Paginator } from "@/database/Paginator";

export class BooksController {
    async getBooks(req: Request, res: Response): Promise<Response> {
        const builder = await AppDataSource.getRepository(Book)
            .createQueryBuilder("book")
            .leftJoinAndSelect("book.author", "author")
            .orderBy("book.id", "DESC");
        const { records: books, paginationInfo } = await Paginator.paginate(builder, req);
        const bookData = books.map((book: Book) => {
            return book.toPayload();
        });
    
        return ResponseUtil.sendResponse(res, "Fetched books successfully", bookData, paginationInfo);
    }

    async getBook(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const book = await AppDataSource.getRepository(Book).findOneByOrFail({
            id: Number(id)
        });

        return ResponseUtil.sendResponse(res, "Fetch book successfully", book, 200);
    }

    async createBook(req: Request, res: Response): Promise<Response> {
        const bookData = req.body;

        const dto = new CreateBookDTO();
        Object.assign(dto, bookData);
        
        await validateOrReject(dto);

        const repo = AppDataSource.getRepository(Book);
        const book = repo.create(bookData);
        await repo.save(book);

        return ResponseUtil.sendResponse(res, "Successfully created new book", book, null);
    }

    async updateBook(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const bookData = req.body;

        const dto = new UpdateBookDTO();
        Object.assign(dto, bookData);
        dto.id = parseInt(id);

        await validateOrReject(dto);

        const repo = AppDataSource.getRepository(Book);
        const book = await repo.findOneByOrFail({
            id: Number(id)
        });

        repo.merge(book, bookData);
        await repo.save(book);
        return ResponseUtil.sendResponse(res, "Successfully update the book", book.toPayload());
    }

    async deleteBook(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const repo = AppDataSource.getRepository(Book);
        const book = await repo.findOneByOrFail({
            id: Number(id)
        });

        await repo.remove(book);
        return ResponseUtil.sendResponse(res, "Successfully delete the book", null);
    }
}