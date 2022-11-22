const express = require('express');

const router = express.Router();

const getAllUsers = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'this route is not yet defiend',
    });
};

const createUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'this route is not yet defiend',
    });
};

const getUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'this route is not yet defiend',
    });
};

const updateUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'this route is not yet defiend',
    });
};

const deleteUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'this route is not yet defiend',
    });
};

router.route('/').get(getAllUsers).post(createUser);

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
