const { Node } = require('../../../common/models');

class NodeService {

    async getAll() {
        let result = await Node.find();
        return result;
    }

}

module.exports =  NodeService;