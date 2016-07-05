var exec =  require('child_process').exec;
var fs = require('fs');

function start(response) {
    console.log('Request handler"start" was called.');

    var content = 'empty';
    exec('ls -lah', function (error, stdout, stderr) {
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write(stdout);
        response.end();
    })
    return content;
}
function upload(response) {
    console.log('Request handler"upload" was called.');
    response.setHeader('Access-Control-Allow-Origin', 'http://portal.example.com:8888');//注意这里不能使用 *
    response.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello Upload");
    response.end();
}

function cors(response) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    fs.readFile('../cors/crossOriginUpload.html', function (err, data) {
        response.end(data);
    })
}

exports.start = start;
exports.upload = upload;
exports.cors = cors;