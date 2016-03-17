/**
 * AJAX Cross Domain
 * 跨源资源共享
 * 跨浏览器的CORS
 * 其它技术有img JSONP
 */

function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
        vxhr = new XDomainRequest();
        xhr.open(method, url);

    } else {
        xhr = null;
    }
    return xhr;
}

var request = createCORSRequest("get", "http://www.somewhere-else.com/page/");
if (request) {
    request.onload = function () {
//对request.responseText 进行处理
    };
    request.send();
}