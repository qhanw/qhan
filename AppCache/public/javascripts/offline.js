window.applicationCache.onchecking = function () {
    log('Checking for application Update.');
}

window.applicationCache.onnoupdate = function () {
    log('No application update found.');
}

window.applicationCache.onupdateready = function () {
    log('Application update ready.')
}

window.applicationCache.onobsolete = function () {
    log('Application obsolete');
}

window.applicationCache.ondownloading = function () {
    log('Downloading application update.');
}

window.applicationCache.oncached = function () {
    log('Application cached');
}

window.applicationCache.onerror = function () {
    log('Application cache error.');
}

window.addEventListener('online', function () {
    log('Online.');
}, true);

window.addEventListener('offline', function () {
    log('Offline.');
}, true);


var showCacheStatus = function (n) {
    statusMessages = ['Uncached', 'Idle', 'Checking', 'Downliading', 'Update Ready', 'Obsolete'];
    return statusMessages[n];
}

var install = function () {
    log('Checking for updates');

    try {
        window.applicationCache.update();
    }catch (e){
        applicationCache.onerror();
    }
}

window.onload = function (e) {
    if(!window.applicationCache){
        log('HTML5 Offline Application are not supported in your browser.');
        return;
    }

    if(!navigator.geolocation){
        log('HTML5 Geolocation is not supported in your browser.');
        return;
    }

    if(!window.localStorage){
        log('HTML5 LocalStorage not supported in your browser.');
        return;
    }

    log('Initial cache status:' + showCacheStatus(window.applicationCache.status));
    document.getElementById('installButton').onclick = install;
}
