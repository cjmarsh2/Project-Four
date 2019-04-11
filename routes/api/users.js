const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/users');

router.post('/signup', usersCtrl.signup);
router.post('/login', usersCtrl.login);
router.post('/:id', usersCtrl.createCrimeList)
router.get('/:id', usersCtrl.index)


module.exports = router;