const express = require('express');
const router = express.Router();
const controller = require('../controller/controller.js');

router.get('/', controller.getHome);
router.get('/search/:query', controller.getGames);

router.get('/edit/:id', controller.getSingleGame);
router.put('/edit/:id', controller.editGame);
router.delete('/edit/:id', controller.deleteGame);



module.exports = router;