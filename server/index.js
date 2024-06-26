const express = require('express')
const app = express()
const cors = require('cors')
const colors = require('colors')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const bookStore = require('./models/bookModel');
const port = process.env.PORT || 5000

connectDB();

// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// uploading a book
app.post("/upload-book", async (req, res) => {
    const data = req.body;
    try {
        const result = await bookStore.create(data);
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// Getting all books
app.get("/all-books", async (req, res) => {
    try {
        const result = await bookStore.find();
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

//Getting a single book
app.get("/book/:id", async (req, res) => {
    try {
        const result = await bookStore.findById(req.params.id);
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
})

// updating the books
app.patch("/update-book/:id", async (req, res) => {
    try {
        const result = await bookStore.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// Deleting the books
app.delete("/delete-book/:id", async (req, res) => {
    try {
        const result = await bookStore.deleteOne({ _id: req.params.id });
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

//getting books on the basis of genre/category
app.get("/books/:category", async (req, res) => {
    try {
        const result = await bookStore.find({ category: req.params.category });
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// Search functionality for books
app.get("/books/search/:searchCriteria", async (req, res) => {
    const searchQuery = req.params.searchCriteria;
    try {
        const result = await bookStore.find({
            $or: [
                { title: { $regex: searchQuery, $options: "i" } },
                { author: { $regex: searchQuery, $options: "i" } }
            ]
        });
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})


