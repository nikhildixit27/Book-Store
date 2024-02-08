const mongoose = require('mongoose');

const BookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        catogory: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        link: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Book', BookSchema);