'use strict'

const express = require('express');
const app = express();
const port = 8080;
const cors = require('cors')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const routerVirtualShelf = require('./routes/VirtualShelves');
const routerBook = require('./routes/Books');
const VirtualShelf = require('./models/VirtualShelf');
const Book = require('./models/Book');

VirtualShelf.hasMany(Book);


app.use(cors())
 
app.get('/', (req, res) => {
    res.send('Welcom to my API');
})

app.listen(port, () => {
    console.log('Running on port' + port);
})


app.use('/virtualShelves', routerVirtualShelf);
 app.use('/books', routerBook);

 app.post('/virtualShelf/:idVirtualShelf/books', async (req, res, next) => {
    try {
        const virtualShelf = await VirtualShelf.findByPk(req.params.idVirtualShelf);
        if (virtualShelf) {
            const book = new Book(req.body);
            book.virtualShelfIdVirtualShelf = virtualShelf.idVirtualShelf;
            console.log(req.params.idVirtualShelf);
            await book.save();
            res.status(201).json({ message: 'Book creat!' });
        }
        else {
            res.status(404).json({ message: 'VirtualShelf nu a fost gasit!' });
        }
    } catch (err) {
        next(err);
    }
})

app.get('/virtualShelf/:idVirtualShelf/books', async (req, res, next) => {
    try {
        const books = await Book.findAll({
            where:{
                virtualShelfIdVirtualShelf: req.params.idVirtualShelf
            }
        });
        if (books) {
            res.status(201).json(books);
        }
        else {
            res.status(404).json({ message: 'VirtualShelf nu a fost gasit!' });
        }
    } catch (err) {
        next(err);
    }
})

app.put('/virtualShelf/:idVirtualShelf/books/:idBook', async (req, res) => {
    try {
        if (req.params.idVirtualShelf && req.params.idBook) {
            const virtualShelf = await VirtualShelf.findByPk(req.params.idVirtualShelf);

            const book = await Book.findByPk(req.params.idBook);

            if (virtualShelf && book) {
                Object.entries(req.body).forEach(([attribute, value]) => book[attribute] = value);
                const updateBook = await book.save();
                return res.status(200).json(updateBook);
            } else {
                return res.status(404).json({ error: `nu a fost gasit id = ${req.body.idBook}` });
            }
        }

    } catch (err) {
        return res.status(500).json(err);
    }
})

app.delete('/virtualShelf/:idVirtualShelf/books/:idBook', async (req, res, next) => {
    Book.destroy({
        where: {
            virtualShelfIdVirtualShelf: req.params.idVirtualShelf,
            idBook: req.params.idBook
        }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: `Book with idVirtualShelf=${req.params.idVirtualShelf} and idBook=${req.params.idBook} deleted!`
                });
            } else {
                res.send({
                    message: `Cannot delete Book with idVirtualShelf=${req.params.idVirtualShelf} and idBook=${req.params.idBook}. Maybe VirtualShelf was not found!`
                });
            }
        })
})