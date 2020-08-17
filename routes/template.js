const express    = require('express');
const router     = express.Router();

router.post('/get', (req, res) => {
    
});

router.post('/add', (req, res) => {
    const data = req.body;
    console.log(data);

    return res.send({
        success: true
    });
});

router.post('/edit', (req, res) => {
    
});

router.post('/delete', (req, res) => {
    
});

module.exports = router;
