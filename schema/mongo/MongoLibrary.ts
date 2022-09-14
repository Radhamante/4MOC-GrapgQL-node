import mongoose from 'mongoose';

const library = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    idAdress: {
        type: String,
        required: true,
    },
    idBooks: {
        type: [String],
        required: true,
    },
});

module.exports = mongoose.model('Library', library);
