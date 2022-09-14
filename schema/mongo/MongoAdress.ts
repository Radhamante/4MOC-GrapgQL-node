import mongoose from 'mongoose';

const address = new mongoose.Schema({
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

export default mongoose.model('Address', address);
