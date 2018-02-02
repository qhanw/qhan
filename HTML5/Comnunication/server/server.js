var http = require('http'),
    url  = require('url');

function start(route, handle) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log('Request for ' + pathname + ' received.');

        /*var content = route(handle, pathname);
        response.write(content);
        response.end();*/

        route(handle, pathname, response);
    }

    http.createServer(onRequest).listen(8888,'localhost');
    console.log("Server running at http://localhost:8888/");
}

exports.start = start;