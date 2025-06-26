const express = require('express');
const router = express.Router();
const { registeraUser, authUser } = require('../controllers/userControllers');
const { protect } = require('../middlewares/authMiddleware');
const { updateUserProfile } = require('../controllers/userControllers');

router.route('/').post(registeraUser);
router.route('/login').post(authUser);
router.route('/profile').post(protect, updateUserProfile);

module.exports = router;