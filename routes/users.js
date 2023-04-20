const express = require('express');
const router = express.Router();
const User = require('../models/User');

// CREATE new user
router.post('/', async (req, res) => {
    const { username, password } = req.body;
    try {
        const newUser = await User.create({
            username,
            password
        });
        res.status(201).json(newUser);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// GET all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// GET user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            res.status(404).send('User not found');
        } else {
            res.status(200).json(user);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// UPDATE user by ID
router.put('/:id', async (req, res) => {
    const { username, password } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                username,
                password
            },
            { new: true }
        );
        if (!updatedUser) {
            res.status(404).send('User not found');
        } else {
            res.status(200).json(updatedUser);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// DELETE user by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            res.status(404).send('User not found');
        } else {
            res.status(200).send('User deleted successfully');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;
