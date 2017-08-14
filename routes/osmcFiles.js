const express = require('express');
const router = express.Router();
const osmcController = require('../src/osmcController');

/* GET home page. */
router.get('/', (req, res) => {
    osmcController.getFilesInFolder().then(
        files => res.json(files)
    )
});

router.put('/', (req, res) => {
    osmcController.updateNameFile(req.body.before, req.body.after).then(
        success => res.status(200).end(),
        error => res.status(error.status).json(error.message)
    ).catch(
        exception => console.error(exception)
    )
});

module.exports = router;