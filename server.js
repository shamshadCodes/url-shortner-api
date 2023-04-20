const express = require('express');
const app = express();
const mongoose = require('mongoose');

// connect to MongoDB database
mongoose.connect('mongodb://127.0.0.1/url-shortner-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
const urlsRouter = require('./routes/urls');
const usersRouter = require('./routes/users');

app.use('/api/urls', urlsRouter);
app.use('/api/users', usersRouter);

// error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
