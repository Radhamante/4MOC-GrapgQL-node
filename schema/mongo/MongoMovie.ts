import mongoose from 'mongoose';

const movie = new mongoose.Schema({
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
    },
    name: {
        type: String,
        required: true,
    },
    borrower: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
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

export default mongoose.model('Movie', movie);
