const Book = require('../models/Book');
//const Entitate2 = require('../models/Book');
const router = require("express").Router();



router.route('/')
    .get(async (req, res) => {
        try {
            const books = await Book.findAll();
            return res.status(200).json(books);
        }
        catch (err) {
            return res.status(500).json(err);
        }
    })
    router.route('/:id')
    .get(async (req, res) => {
        try {
            const book = await Book.findByPk(req.params.id);
            if (book) {
                return res.status(200).json(book);
            } else {
                return res.status(404).json({ error: `nu a fost gasit id = ${req.params.id}` });
            }
        }
        catch (err) {
            return res.status(500).json(err);
        }
    })
    .put(async (req, res) => {
        try {
            const book = await Book.findByPk(req.params.id);
            if (book) {
                const updatebook = await book.update(req.body);
                return res.status(200).json(updatebook);
                
            } else {
                return res.status(404).json({ error: `nu a fost gasit id = ${req.params.id}` });
            }

        }
        catch (err) {
            return res.status(500).json(err);
        }
    })
    .delete(async (req, res) => {
        const id = req.params.id;

        Book.destroy({
            where: { idBook: id }
        })
            .then(num => {
                if (num == 1) {
                    res.send({
                        message: `Book cu id=${id} a fost stearsa!`
                    });
                } else {
                    res.send({
                        message: `Cannot delete Book with id=${id}. Maybe Book was not found!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Could not delete Book with id=" + id
                });
            })
    })


module.exports = router;