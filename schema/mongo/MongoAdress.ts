import mongoose from 'mongoose';

const adress = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    long: {
        type: String,
        required: true,
    },
    lat: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: false,
    },
});

module.exports = mongoose.model('Adress', adress);
