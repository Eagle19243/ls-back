const express    = require('express');
const router     = express.Router();

/**
 * Return messages by phone number
 * if no phone number, return all messages
 */
router.post('/get', (req, res) => {
    const rcAuthData = req.body.rcAuthData;
});

module.exports = router;
