const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt'); // Use bcrypt, not bcrypt-nodejs

// No need for mongoose.Promise = global.Promise;


const UserSchema = new Schema({
    name: String,
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true, select: false }
});

UserSchema.pre('save', async function() {
    if (!this.isModified('password')) return;

    try {
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
    } catch (err) {
        throw err;
    }
});

UserSchema.methods.comparePassword = async function(password) { // Use async/await
    try {
        return await bcrypt.compare(password, this.password);
    } catch (err) {
        return false; // Or handle the error as you see fit
    }
};

module.exports = mongoose.model('User', UserSchema);