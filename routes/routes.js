const express = require('express');
const router = express.Router();
const controller = require('../controller/controller.js');

router.get('/', controller.getHome);
// router.get('/search', controller.);

router.get('/edit/:id', controller.getSingleGame);
router.delete('/edit/:id', controller.deleteGame);
router.put('/edit/:id', controller.editGame);

// router.post('/delete', controller.deleteComment);


module.exports = router;