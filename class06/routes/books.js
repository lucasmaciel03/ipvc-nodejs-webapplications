import Router from "express";
import {
    getAllBooks,
    createNewBook,
    getBookByID,
    updateBookByID,
    deleteBookByID,
    getAllBooksBySubject,
    getAllBooksByAuthor,
    deleteAllBooksByAuthor,
    getAllBooksByDateRelease,
} from "../controllers/book.js";

const BooksRoutes = Router();

// CRUD

// {host}/api/books
BooksRoutes.get("/", getAllBooks);

BooksRoutes.post("/newbook", createNewBook);

BooksRoutes.get("/findbook/:id", getBookByID);

BooksRoutes.put("/updatebook/:id", updateBookByID);

BooksRoutes.delete("/deletebook/:id", deleteBookByID);

BooksRoutes.get("/subject/:subject", getAllBooksBySubject);

BooksRoutes.get("/author/:author", getAllBooksByAuthor);

BooksRoutes.delete("/deleteauthor/:author", deleteAllBooksByAuthor);

BooksRoutes.get("/release/:release", getAllBooksByDateRelease);

export { BooksRoutes };

