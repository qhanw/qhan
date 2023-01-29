/**
 * AJAX原生JS方法
 * @returns {*}
 */
function createXHR() {
    if (typeof XMLHttpRequest != "undefined") {
        return new XMLHttpRequest();
    } else if (typeof ActiveXObject != "undefined") {
        if (typeof arguments.callee.activeXString != "string") {
            var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0",
                    "MSXML2.XMLHttp"],
                i, len;
            for (i = 0, len = versions.length; i < len; i++) {
                try {
                    new ActiveXObject(versions[i]);
                    arguments.callee.activeXString = versions[i];
                    break;
                } catch (ex) {
                    //跳过
                }
            }
        }
        return new ActiveXObject(arguments.callee.activeXString);
    } else {
        throw new Error("No XHR object available.");
    }
}


/**
 * 采用惰性加载方式优化AJAX情能
 */

/**
 * 在函数被调用时再处理函数
 * 在第一次调用的过程中，该函数会被覆盖为另外一个按合适方式执行的函数，这样任何对原函数的调用都不用再经过执行的分支了。
 */

function createXHR1() {
    if (typeof XMLHttpRequest != 'undefined') {
        createXHR1 = function () {
            return new XMLHttpRequest();
        }
    } else if (typeof ActiveXObject != 'undefined') {
        createXHR1 = function () {
            if (typeof arguments.callee.activeXString != 'string') {
                var versions = ['MSXML2.XMLHttp.6.0', 'MSXML2.XMLHttp.3.0', 'MSXML2.XMLHttp'], i;
                for (i = 0; i < versions.length; i++) {
                    try {
                        new ActiveXObject(versions[i]);
                        arguments.callee.activeXString = versions[i];
                        break;
                    } catch (ex) {
                        //skip
                    }
                }
            }
            return new ActiveXObject(arguments.callee.activeXString);
        }
    } else {
        createXHR1 = function () {
            throw new Error('No XHR object available!');
        }
    }
}

/**
 * 在声明函数时就指定适当的函数
 * 这种方式第一次调用函数时就不会损失性能了，而在代码首次加载时会损失一点性能
 */

var createXHR2 = (function () {
    if (typeof XMLHttpRequest != 'undefined') {
        return function () {
            return new XMLHttpRequest();
        }
    } else if (typeof ActiveXObject != 'undefined') {
        return function () {
            if (typeof arguments.callee.activeXString != 'string') {
                var versions = ['MSXML2.XMLHttp.6.0', 'MSXML2.XMLHttp.3.0', 'MSXML2.XMLHttp'], i;
                for (i = 0; i < versions.length; i++) {
                    try {
                        new ActiveXObject(versions[i]);
                        arguments.callee.activeXString = versions[i];
                        break;
                    } catch (ex) {
                        //skip
                    }
                }
            }
            return new ActiveXObject(arguments.callee.activeXString);
        }
    } else {
        return function () {
            throw new Error('No XHR object available!')
        }
    }
})();

// 用法

var xhr = createXHR();

xhr.open("get", "example.php", false);