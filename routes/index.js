const express    = require('express');
const router     = express.Router();
const SFTPClient = require('ssh2').Client;
const FTPClient  = require('ftp');
const Readable   = require('stream').Readable;

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

    console.log("isSFTP::::", isSFTP)
    
    if (isSFTP > 0) {
        const conn = new SFTPClient(); 
        conn.on('ready', () => {
            conn.sftp((err, sftp) => {
                // if (err) {
                //     console.log('SFTP error:', err);
                //     res.send({ success: false, error: err.message });
                // } else {
                    res.send({ success: true });
                // }
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
            console.log(err);
            res.send({ success: true });
        });

        conn.on('error', () => {
            conn.end();
            res.send({success: false})
        });
        
        conn.connect({
            host: host,
            port: port,
            user: username,
            password: password,
            secure: encryption > 0
        });
    }
});

router.post('/sftp_upload', (req, res, next) => {
    const isSFTP    = req.body.is_sftp;
    const host      = req.body.host;
    const port      = req.body.port;
    const username  = req.body.username;
    const password  = req.body.password;
    const content   = req.body.content;
    const filename  = `${(new Date()).getTime()}.html`;
    
    if (isSFTP > 0) {
        const conn = new SFTPClient(); 
        conn.on('ready', () => {
            conn.sftp((err, sftp) => {
                if (err) {
                    console.log('SFTP error:', err);
                    res.send({ success: false, error: err.message });
                } else {
                    const writeStream = sftp.createWriteStream(`/${filename}`);
                    writeStream.on('close', () => {
                        console.log( "File transferred" );
                        sftp.end();
                        res.send({ success: true, url: `${host}/lightspeed/${filename}` });
                    });
                    writeStream.write(content);
                    writeStream.end();
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
            conn.put(content, `/${filename}`, (err) => {
                if (err) {
                    console.log('FTP error:', err);
                    res.send({ success: false, error: err.message });
                } else {
                    console.log( "File transferred" );
                    res.send({ success: true, url: `${host}/lightspeed/${filename}` });
                }

                conn.end();
            });
        }).connect({
            host: host,
            port: port,
            user: username,
            password: password,
            secure: encryption > 0
        });
    }
});

module.exports = router;
