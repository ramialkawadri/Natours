const fs = require('fs');

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkId = (req, res, next, val) => {
    if (val * 1 > tours.length) {
        return res.status(404).json({
            status: 'failed',
            message: 'invalid Id',
        });
    }

    next();
};

exports.checkBody = (req, res, next) => {
    const keys = Object.keys(req.body);

    for (const property of ['price', 'name']) {
        if (!keys.includes(property))
            return res.status(400).json({
                status: 'fail',
                message: `missing property ${property}`,
            });
    }

    next();
};

exports.getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours,
        },
    });
};

exports.getTour = (req, res) => {
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

exports.createTour = (req, res) => {
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

exports.updateTour = (req, res) => {
    res.send(200).json({
        status: 'success',
        data: {
            tour: '<Updated tour here>',
        },
    });
};

exports.deleteTour = (req, res) => {
    res.status(204).json({
        status: 'success',
        data: null,
    });
};
