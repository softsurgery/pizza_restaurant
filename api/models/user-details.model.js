// Import Mongoose
const mongoose = require('mongoose');

const userDetailsSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true
    },
    additionalPhoneNumber: {
        type: String,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    region: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    // }
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

const UserDetails = mongoose.model('UserDetails', userDetailsSchema);
module.exports = UserDetails;
