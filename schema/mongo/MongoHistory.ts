import mongoose from 'mongoose';

const history = new mongoose.Schema({
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    borrower: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    startDate: {
        type: Date,
        default: Date.now(),
        required: true,
    },
    endDate: {
        type: Date,
        required: false,
    },
});

export default mongoose.model('History', history);
