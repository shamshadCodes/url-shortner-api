const mongoose = require('mongoose');
const base62 = require('base62')

const urlSchema = new mongoose.Schema(
    {
        longUrl: { type: String, required: true },
        shortUrl: { type: String, unique: true },
    }
);

urlSchema.pre("save", function (next) {
    if (this.isNew) {
        this.shortUrl = "te.st/" + base62.encode(Date.now());
    }
    next();
})

const Url = mongoose.model('Url', urlSchema);

module.exports = Url;