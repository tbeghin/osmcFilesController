const express = require('express');
const router = express.Router();
const osmcController = require('../src/osmcController');

/* GET home page. */
router.get('/', function (req, res) {
    osmcController.getFilesInFolder().then(
        data => res.render('index', {title: 'OSMC', data: data})
    );
});

module.exports = router;
