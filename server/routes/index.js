const express = require('express');
const router = express.Router();

const { register, vote, getWinningCandidates, getAllCandidates } = require('../controllers/mainController.js');

router.post('/register', register);
router.post('/vote', vote);
router.get('/winning-candidates', getWinningCandidates);
router.get('/candidates', getAllCandidates);

module.exports = router;
