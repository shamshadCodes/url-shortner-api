const express = require('express');
const router = express.Router();
const Url = require('../models/Url');

// GET all urls
router.get('/', async (req, res) => {
    try {
        const urls = await Url.find();
        res.json(urls);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET one url
router.get('/:id', getUrl, (req, res) => {
    res.json(res.url);
});

// CREATE a url
router.post('/', async (req, res) => {
    const url = new Url({
        longUrl: req.body.longUrl,
        shortUrl: req.body.shortUrl,
    });

    try {
        const newUrl = await url.save();
        res.status(201).json(newUrl);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// UPDATE a url
router.patch('/:id', getUrl, async (req, res) => {
    if (req.body.longUrl != null) {
        res.url.longUrl = req.body.longUrl;
    }

    if (req.body.shortUrl != null) {
        res.status(400).json({ message: "Cannot manually change short URLs" })
        return
    }

    try {
        const updatedUrl = await res.url.save();
        res.json(updatedUrl);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a url
router.delete('/:id', getUrl, async (req, res) => {
    try {
        await Url.deleteOne({ _id: res.url.id });
        res.json({ message: 'Deleted URL' });
    } catch (err) {
        res.status(500).json({ message: err.message, hello: "NLKKjsjf" });
    }
});

async function getUrl(req, res, next) {
    let url;
    try {
        url = await Url.findById(req.params.id);
        if (url == null) {
            return res.status(404).json({ message: 'Cannot find URL' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.url = url;
    next();
}

module.exports = router;
