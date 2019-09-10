const fs = require('fs');
const path = require('path');

const { Logger } = require('../core');

const env = require('../config/environment');
const routesPath = path.join(__dirname, '../../src');

const routes = [];

function registerRoutes(app) {

    Logger.log('Initialize routes registration');

    getRoutes(routesPath);

    routes.forEach((route) => {
        Logger.log(`Route registered => ${route}`);
        app.use(env.BASE_URL, require(route));
    });

    Logger.log('Routes registration complete');
}

function getRoutes(directoryPath) {
    fs.readdirSync(directoryPath).forEach(file => {
        
        let fullPath = path.join(directoryPath, file);

        if (fs.statSync(fullPath).isDirectory()) {
            getRoutes(fullPath);
        } else if (fullPath.endsWith('.controller.js') && path.extname(fullPath) == '.js') {
            routes.push(fullPath);
        }

    });
}

module.exports = registerRoutes;