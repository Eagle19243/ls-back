const express    = require('express');
const router     = express.Router();

router.use('/template', require('./template'));
router.use('/sftp', require('./sftp'));

/* GET home page. */
router.get('/', (req, res) => {
    res.render('index');
});

/** Should be removed once v4 is in live */
router.post('/sftp_test', (req, res) => {
    res.redirect('/sftp/test');
});

router.post('/sftp_upload', (req, res) => {
    res.redirect('/sftp/upload');
});

module.exports = router;
