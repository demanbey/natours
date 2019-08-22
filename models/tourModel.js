const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have a name.'],
        unique: true,
        trim: true
    },
    duration: {
        type: Number,
        required: [true, 'A tour must have a validation']
    },
    maxGroupSize: {
        type: Number,
        required: [true, 'A tour must have a max group size']
    },
    difficulty: {
        type: String,
        required: [true, 'A tour must have difficulty']
    },
    ratingsAverage: {
        type: Number,
        default: 4.5
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true, 'A tour must have a price.']
    },
    price: Number,
    summary: {
        type: String,
        trim: true, 
        required: [true, 'A tour must have a description']
    },
    description: {
        type: String,
        trim: true
    },
    imageCover: {
        type: String,
        required: [true, 'A tour must have a cover image']
    },
    images: [String],
    CreatedAt: {
        type: Date,
        default: Date.now(),
        select: false
    }, 
    startDates: [Date]
})

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;