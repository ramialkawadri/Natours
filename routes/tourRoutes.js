const express = require('express');

const authController = require('../controllers/authController');
const tourController = require('../controllers/tourController');

const router = express.Router();

router
    .route('/top-5-cheap')
    .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthlyPlan/:year').get(tourController.getMonhlyPlan);

router
    .route('/')
    .get(authController.protect, tourController.getAllTours)
    .post(tourController.createTour);

router
    .route('/:id')
    .delete(
        authController.protect,
        authController.restrictTo('admin', 'lead-guide'),
        tourController.deleteTour
    )
    .patch(tourController.updateTour)
    .get(tourController.getTour);

module.exports = router;
module.exports = router;
