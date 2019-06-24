const express    = require('express');
const router     = express.Router();
const SFTPClient = require('ssh2').Client;
const FTPClient  = require('ftp');;

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

router.post('/sftp_test', (req, res, next) => {
    const isSFTP    = req.body.is_sftp;
    const host      = req.body.host;
    const port      = req.body.port;
    const username  = req.body.username;
    const password  = req.body.password;
    
    if (isSFTP) {
        const conn = new SFTPClient(); 
        conn.on('ready', () => {
            conn.sftp((err, sftp) => {
                if (err) {
                    console.log('SFTP error:', err);
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
    } else {
        const encryption = req.body.encryption;
        const conn = new FTPClient();
        conn.on('ready', () => {
            res.send({ success: true });
        }).connect({
            host: host,
            port: port,
            user: username,
            password: password,
            secure: encryption > 0
        });
    }
});

// router.post('/sftp_upload', (req, res, next) => {
    
// });

module.exports = router;
