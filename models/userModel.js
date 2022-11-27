const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A user must have an email'],
    },
    email: {
        type: String,
        validate: [validator.isEmail, 'Please provide a valid email'],
        required: [true, 'A user must have an email'],
        unique: true,
        lowercase: true,
    },

    photo: String,

    password: {
        type: String,
        required: [true, 'A user must have a password'],
        minlength: 8,
        select: false,
    },

    passwordConfirm: {
        type: String,
        required: [true, 'You must confirm your password'],
        validate: {
            // Only works on CREATE and SAVE
            validator: function (value) {
                return value === this.password;
            },
            message: 'Passwords must match!',
        },
    },
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return;

    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;

    next();
});

userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

const User = new mongoose.model('User', userSchema);

module.exports = User;
