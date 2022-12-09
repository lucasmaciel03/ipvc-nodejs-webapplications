import { BookModel } from "../models/book.js";

// get all books and dont return id
export const getAllBooks = async (req, res) => {
    const books = await BookModel.findAll({
        attributes: {
            exclude: ["id"]
        }
    });
    res.send(books);
}

// get book by id 
export const getBookByID = async (req, res) => {
    const { id } = req.params;
    const book = await BookModel.findByPk(id, {
        attributes: {
            exclude: ["id"]
        }
    });
    if (book) {
        res.send(book);
    } else {
        res.status(404).send("Book not found");
    }
}

// update book by id
export const updateBookByID = async (req, res) => {
    const { id } = req.params;
    const { title, author, release, subject } = req.body;
    const book = await BookModel.findByPk(id);
    if (book) {
        book.title = title ?? book.title;
        book.author = author ?? book.author;
        book.release = release ?? book.release;
        book.subject = subject ?? book.subject;
        await book.save();
        res.send(book);
    } else {
        res.status(404).send("Book not found");
    }
}

// delete book by id
export const deleteBookByID = async (req, res) => {
    const { id } = req.params;
    const book = await BookModel.findByPk(id);
    if (book) {
        await book.destroy();
        res.send("Book deleted");
    } else {
        res.status(404).send("Book not found");
    }
}
// create new book, id autoincrement, data insert BY USER
export const createNewBook = async (req, res) => {
    const { title, author, release, subject } = req.body;
    const book = await BookModel.create({
        title,
        author,
        release,
        subject
    });
    res.send(book);
}

// get all books by subject and dont return id if not found return 404
export const getAllBooksBySubject = async (req, res) => {
    const { subject } = req.params;
    const books = await BookModel.findAll({
        where: {
            subject
        },
        attributes: {
            exclude: ["id"]
        }
    });
    if (books.length) {
        res.send(books);
    } else {
        res.status(404).send("Books not found");
    }
}

// get all books by author and dont return id if not found return 404
export const getAllBooksByAuthor = async (req, res) => {
    const { author } = req.params;
    const books = await BookModel.findAll({
        where: {
            author
        },
        attributes: {
            exclude: ["id"]
        }
    });
    if (books.length) {
        res.send(books);
    } else {
        res.status(404).send("Books not found");
    }
}

// delete all by author if not found return 404
export const deleteAllBooksByAuthor = async (req, res) => {
    const { author } = req.params;
    const books = await BookModel.findAll({
        where: {
            author
        }
    });
    if (books.length) {
        books.forEach(async (book) => {
            await book.destroy();
        });
        res.send("Books deleted");
    } else {
        res.status(404).send("Books not found");
    }
}

// get all books by date release between two dates and not return id if not found return 404
export const getAllBooksByDateRelease = async (req, res) => {
    const { start, end } = req.params;
    const books = await BookModel.findAll({
        where: {
            release: {
                [Op.between]: [start, end]
            }
        },
        attributes: {
            exclude: ["id"]
        }
    });
    if (books.length) {
        res.send(books);
    } else {
        res.status(404).send("Books not found");
    }
}
