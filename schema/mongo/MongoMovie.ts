import mongoose from 'mongoose';

const book = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: false,
    },
    date: {
        type: String,
        required: true,
    },
    idLibrary: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    idBorrower: {
        type: String,
        required: false,
    },
    imageUrl: {
        type: String,
        required: false,
    },
    genre: {
        type: [String],
        required: true,
    },
    idHistory: {
        type: [String],
        required: true,
    },
});

export default mongoose.model('Book', book);
