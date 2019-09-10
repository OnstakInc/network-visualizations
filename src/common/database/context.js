const mongoose = require('mongoose');

const { DATABASE_URL } = require('../../config/environment');

function context() {

    mongoose.connect(DATABASE_URL, { useNewUrlParser: true })
        .catch((err) => {
            console.log(err.message);
        });

    const db = mongoose.connection;

    db.on('error', (err) => {
        console.log(err.message);
    });

    return db;
}

module.exports = context;