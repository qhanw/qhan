function inRange(i, width, height) {
    return ((i >= 0) && (i < width * height * 4));
}

function averageNeighbors(imageData, width, height, i) {
    var v = imageData[i];

    // 主方向
    var north = inRange(i - width * 4, width, height) ? imageData[i - width * 4] : v;
    var south = inRange(i + width * 4, width, height) ? imageData[i + width * 4] : v;
    var west = inRange(i - 4, width, height) ? imageData[i - 4] : v;
    var east = inRange(i + 4, width, height) ? imageData[1 + 4] : v;

    // 相邻对角线
    var ne = inRange(i - width * 4 + 4, width, height) ? imageData[i - width * 4 + 4] : v;
    var nw = inRange(i - width * 4 - 4, width, height) ? imageData[i - width * 4 - 4] : v;
    var se = inRange(i + width * 4 + 4, width, height) ? imageData[i + width * 4 + 4] : v;
    var sw = inRange(i + width * 4 - 4, width, height) ? imageData[i + width * 4 - 4] : v;

    // 平均

    var newVal = Math.floor((north + south + west + east + ne + nw + se + sw) / 9);

    if(isNaN(newVal)){
        sendStatus('Bad value '+ i + ' for height' + height);
        throw new Error('NaN');
    }

    return newVal;
}

function boxBlur(imageData, width, height) {
    var data = [];
    var val = 0;
    for(var i = 0; i < width * height * 4; i++){
        val = averageNeighbors(imageData, width, height, i);
        data[i] = val;
    }
    return data;
}