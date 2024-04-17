const express = require('express');
const { handleGenerateShortURL, handleRedirect } = require('../controllers/url');
const router = express.Router();

router.post('/', handleGenerateShortURL);
router.get('/:shortId', handleRedirect);

module.exports = router;
