const express   = require('express');
const router    = express.Router();
const Client    = require('ssh2').Client;
const conn      = new Client(); 

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

router.post('/sftp_test', (req, res, next) => {
    const host      = req.body.host;
    const port      = req.body.port;
    const username  = req.body.username;
    const password  = req.body.password;
    
    conn.on('ready', function() {
        conn.sftp(function(err, sftp) {
            if (err) {
                res.send({ success: false, error: err.message });
            } else {
                res.send({ success: true });
            }
        });
    }).connect({
        host: host,
        port: port,
        username: username,
        password: password
    });
});

// router.post('/sftp_upload', (req, res, next) => {
    
// });

module.exports = router;
