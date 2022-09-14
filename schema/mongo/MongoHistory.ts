import mongoose from 'mongoose';

const history = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    idBook: {
        type: String,
        required: true,
    },
    idBorrower: {
        type: String,
        required: true,
    },
    startDate: {
        type: String,
        required: true,
    },
    endDate: {
        type: String,
        required: false,
    },
});

module.exports = mongoose.model('History', history);
