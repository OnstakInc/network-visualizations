const request = require('request-promise-native');

require('../src/common/database/context')();

const { Node } = require('../src/common/models');

const { Logger } = require('../src/core');

const updateNodes = setInterval(async () => {
    try {

        let nodes = await Node.find();

        nodes.forEach((node) => {

            request(`http://${node.ipAddress}:${node.portGroup.port}/health`, { json: true })
                .then(async (result) => {

                    if (result.statusCode == 200) {

                        // eslint-disable-next-line require-atomic-updates
                        node.portGroup.status = 'Ok';

                        await Node.findByIdAndUpdate(node._id, node);

                    } else {

                        // eslint-disable-next-line require-atomic-updates
                        node.portGroup.status = 'Unreachable';

                        await Node.findByIdAndUpdate(node._id, node);

                    }

                }).catch(async (err) => {

                    Logger.error(err.message);

                    // eslint-disable-next-line require-atomic-updates
                    node.portGroup.status = 'Unreachable';

                    await Node.findByIdAndUpdate(node._id, { $set: node });
                });
        });

    } catch (err) {
        Logger.error(err.message);
    }
}, 5000);

module.exports = updateNodes;