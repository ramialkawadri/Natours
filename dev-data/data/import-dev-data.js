const fs = require('fs');

const Tour = require('../../models/tourModel');

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => console.log('DB connection successful!'));

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

const importData = async () => {
    try {
        await Tour.create(tours);
        console.log('Data loaded');
    } catch (error) {
        console.log(error);
    }
};

const deleteAllData = async () => {
    try {
        await Tour.deleteMany();
        console.log('Data deleted');
    } catch (err) {
        console.log(err);
    }
};

(async () => {
    await deleteAllData();
    await importData();
})();
