const express = require('express');
const router = express.Router();
const controller = require('../controllers/mainController');

router.post('/api/users', controller.create);
router.get('/api/users', controller.find);
router.put('/api/users/:id', controller.update);
router.delete('/api/users/:id', controller.delete);

module.exports = router;
