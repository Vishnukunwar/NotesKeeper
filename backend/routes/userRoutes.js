const express = require('express');
const router = express.Router();
const { registeraUser, authUser } = require('../controllers/userControllers');

router.route('/').post(registeraUser);
router.route('/login').post(authUser);

module.exports = router;