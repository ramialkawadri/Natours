const express = require('express');

const tourController = require('../controllers/tourController');

const router = express.Router();

router.param('id', tourController.checkId);

router
    .route('/')
    .get(tourController.getAllTours)
    .post(tourController.checkBody, tourController.createTour);

router
    .route('/:id')
    .delete(tourController.deleteTour)
    .patch(tourController.updateTour)
    .get(tourController.getTour);

module.exports = router;
module.exports = router;
