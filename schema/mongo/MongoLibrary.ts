import mongoose from 'mongoose';

const library = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
        required: true,
    },
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
});

export default mongoose.model('Library', library);
