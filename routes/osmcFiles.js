const express = require('express');
const router = express.Router();
const osmcController = require('../src/osmcController');

router.get('/', (req, res) => {
    let folder = req.query.folderPath;
    osmcController.getFilesInFolder(folder).then(
        result => res.json(result),
        err => res.status(err.status).json(err.message)
    )
});

router.post('/', (req, res) => {
    let data = req.body;
    osmcController.addFolder(data.source, data.folder).then(
        result => res.json(result),
        err => res.status(err.status).json(err.message)
    )
});

router.put('/', (req, res) => {
    osmcController.updateNameFile(req.body.before, req.body.after).then(
        () => res.status(200).end(),
        error => res.status(error.status).json(error.message)
    ).catch(
        exception => console.error(exception)
    )
});

module.exports = router;