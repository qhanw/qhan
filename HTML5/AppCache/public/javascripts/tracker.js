var storeLocation = function (latitude, longitude) {
    var locations = JSON.parse(localStorage.locations || '[]');
    locations.push({'latitude':latitude, 'longitude': longitude});
    localStorage.locations = JSON.stringify(locations);
}

var handlePositionUpdate = function (e) {
    var latitude = e.coords.latitude;
    var longitude = e.coords.longitude;
    log('Position update:', latitude, longitude);
    storeLocation(latitude, longitude);
    if(navigator.onLine){
        uploadLocations(latitude, longitude);
    }

}

var handlePositionError = function (e) {
    log('Position error!');
}

var uploadLocations = function (latitude, longitude) {
    var request = new XMLHttpRequest();
    request.onload = function (e) {
        if((request.status >= 200 && request.status < 300) || request.status == 304){
            log(request.responseText);
            console.log(JSON.parse(request.responseText));
        }else {
            log('Request was unsuccessful: '+ request.status);
        }
    }
    request.onprogress = function (event) {
        if (event.lengthComputable){
            log('Received ' +event.position + 'of' + event.totalSize + 'bytes');
        }
    }
    request.open('POST', 'http://localhost:3000/geoupload',true);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    request.send('locations='+localStorage.locations);
    /*$.post('http://localhost:3000/geoupload',{'locations':localStorage.locations}, function (data) {
        log(JSON.stringify(data));
        console.log(JSON.parse(data.locations))
    })*/
}

var geolocationConfig = {'maximunAge':1000};
navigator.geolocation.watchPosition(handlePositionUpdate, handlePositionError, geolocationConfig);