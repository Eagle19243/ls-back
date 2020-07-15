const express    = require('express');
const router     = express.Router();
const ringcentral = require('../utils/ringcentral');

/**
 * Return messages by phone number
 */
router.post('/get', async (req, res) => {
    const rcAuthData  = req.body.rcAuthData;
    const phone       = req.body.phone;
    const messages    = await ringcentral.getMessages(phone, rcAuthData);
    
    res.send({
        success     : true,
        messages    : messages
    });
});

module.exports = router;
