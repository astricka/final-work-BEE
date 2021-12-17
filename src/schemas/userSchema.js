const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const schema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    age: {
        type:Number,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    }
});

schema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (e) {
        next(e);
    }
});

schema.pre('findOneAndUpdate', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this._update.password, salt);
        this._update.password = hashedPassword;
        next();
    } catch (e) {
        next(e);
    }
});

module.exports = mongoose.model('usersDB', schema);
