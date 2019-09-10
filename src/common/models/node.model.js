const mongoose = require('mongoose');

const NodeSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    displayName: {
        type: String,
        trim: true
    },
    ipAddress: {
        type: String,
        required: true,
        trim: true
    },
    portGroup: {
        type: mongoose.SchemaTypes.Mixed
    },
    childNodes: {
        type: mongoose.SchemaTypes.Mixed
    }
});

var Node = mongoose.model('nodes', NodeSchema);

module.exports = Node;
