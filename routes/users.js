const router = require('express').Router();
const { updateUserValidation } = require('../validation/users');

const {
  getUserInfo,
  updateUserInfo,
} = require('../controllers/users');

router.get('/me', getUserInfo);
router.patch('/me', updateUserValidation, updateUserInfo);

module.exports = router;
