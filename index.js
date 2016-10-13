var express = require('express');
var port = Number(process.env.PORT || 8080);
var app = express();
app.use('/',express.static('public'));
app.get('/api/whoami',function(req,res){
    var software = req.headers['user-agent'].split(' ');
    var data = {
        ipaddress: req.headers['x-forwarded-for'],
        language: req.headers['accept-language'].split(',')[0],
        software: software[1].slice(1)+" "+software[2]+" "+software[3].slice(0,-1)
    }
    res.json(data);
});
app.get('/*',function(req,res){
    var data = '//'+req.hostname+'/api/whoami'
    res.redirect(data);
});
app.listen(port);