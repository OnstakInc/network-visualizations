
require('../src/common/database/context')();

const { Node } = require('../src/common/models');

const data = require('../data/data.json');

async function initializeDatabase() {
    try {
        let result = await Node.deleteMany({});

        console.log(result);
    
        let nodes = await Node.insertMany(data);
    
        console.log(nodes);

    } catch (err) {
        console.log(err.message);
    }
}

initializeDatabase();