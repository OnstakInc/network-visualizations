const express = require('express');
const router = express.Router();

const NodeService = require('./node.service');
const nodeService = new NodeService();

router.get('/api/v1/nodes', async (req, res, next) => {

    try {
        let result = await nodeService.getAll();
        return res.json(result);
    } catch (err) {
        next(err);
    }

});

module.exports = router;
