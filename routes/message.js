const express    = require('express');
const router     = express.Router();
const ringcentral = require('../utils/ringcentral');

/**
 * Return messages by phone number
 */
router.post('/get', async (req, res) => {
    const rcAuthData  = req.body.rcAuthData;
    const phoneNumber = req.body.phoneNumber;
    const messages    = await ringcentral.getMessages(phoneNumber, rcAuthData);
    
    res.send({
        success     : true,
        messages    : messages
    });
});

module.exports = router;
