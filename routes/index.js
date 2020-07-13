const express    = require('express');
const router     = express.Router();

router.use('/message', require('./message'));
router.use('/template', require('./template'));
router.use('/sftp', require('./sftp'));

/* GET home page. */
router.get('/', (req, res) => {
    res.render('index');
});

module.exports = router;
