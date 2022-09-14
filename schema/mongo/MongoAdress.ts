import mongoose from 'mongoose';

const adress = new mongoose.Schema({
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
