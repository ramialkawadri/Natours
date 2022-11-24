const Tour = require('../models/tourModel');

exports.getAllTours = async (req, res) => {
    try {
        const queryObject = { ...req.query };
        const excludedFields = ['page', 'sort', 'limit', 'fields'];

        for (const field of excludedFields) delete queryObject[field];

        let queryStr = JSON.stringify(queryObject);

        queryStr = queryStr.replace(
            /\b(gte|gt|lte|lt)\b/g,
            (match) => `$${match}`
        );

        let query = Tour.find(JSON.parse(queryStr));

        if (req.query.sort)
            query = query.sort(req.query.sort.replaceAll(',', ' '));
        else query = query.sort('-createdAt');

        if (req.query.fields) {
            const fields = req.query.fields.replaceAll(',', ' ');
            query = query.select(fields);
        } else {
            query = query.select('-__v');
        }

        const tours = await query;

        res.status(200).json({
            status: 'success',
            results: tours.length,
            data: {
                tours,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};

exports.getTour = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            results: tour.length,
            data: {
                tour,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};

exports.createTour = async (req, res) => {
    try {
        const newTour = await Tour.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'Invalid data sent!',
        });
    }
};

exports.updateTour = async (req, res) => {
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.send(200).json({
            status: 'success',
            data: {
                tour,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};

exports.deleteTour = async (req, res) => {
    try {
        await Tour.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status: 'success',
            data: null,
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'failed to delete the tour',
        });
    }
};
