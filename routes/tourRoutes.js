const fs = require('fs');

const express = require('express');

const router = express.Router();

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours,
        },
    });
};

const getTour = (req, res) => {
    const id = req.params.id * 1;

    const tour = tours.find((el) => el.id === id);

    if (!tour) {
        return res.status(404).json({
            status: 'failed',
            message: 'invalid Id',
        });
    }
    res.status(200).json({
        status: 'success',
        results: tour.length,
        data: {
            tour,
        },
    });
};

const createTour = (req, res) => {
    const newId = tours[tours.length - 1].id + 1;
    const newTour = { ...req.body, id: newId };

    tours.push(newTour);
    fs.writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`,
        JSON.stringify(tours),
        () => {
            res.status(201).json({
                status: 'success',
                data: {
                    tour: newTour,
                },
            });
        }
    );
};

const updateTour = (req, res) => {
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'failed',
            message: 'invalid Id',
        });
    }

    res.send(200).json({
        status: 'success',
        data: {
            tour: '<Updated tour here>',
        },
    });
};

const deleteTour = (req, res) => {
    const id = req.params.id * 1;

    const tour = tours.find((el) => el.id === id);

    if (!tour) {
        return res.status(404).json({
            status: 'failed',
            message: 'invalid Id',
        });
    }

    res.status(204).json({
        status: 'success',
        data: null,
    });
};

router.route('/').get(getAllTours).post(createTour);

router.route('/:id').delete(deleteTour).patch(updateTour).get(getTour);

module.exports = router;
