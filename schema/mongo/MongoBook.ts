import mongoose from 'mongoose';

const book = new mongoose.Schema({
    isbn: {
        type: String,
        required: true,
    },
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
    library: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Library',
        required: true,
    },
    borrower: { type: mongoose.Schema.Types.ObjectId, ref: 'Borrower' },
    imageUrl: {
        type: String,
        required: false,
    },
    genre: {
        type: [String],
        required: true,
    },
    history: [{ type: mongoose.Schema.Types.ObjectId, ref: 'History' }],
});

export default mongoose.model('Book', book);
