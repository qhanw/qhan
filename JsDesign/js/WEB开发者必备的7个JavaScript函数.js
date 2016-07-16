/**
 * WEB开发者必备的7个JavaScript函数
 * **/

/**
 *防止高频调用的debounce函数
 * 这个 debounce 函数对于那些执行事件驱动的任务来说是必不可少的提高性能的函数。如果你在使用scroll, resize, key*等事件触发执行任务时不使用降频函数，也行你就犯了重大的错误。下面这个降频函数 debounce 能让你的代码变的高效：
 * 这个 debounce 函数在给定的时间间隔内只允许你提供的回调函数执行一次，以此降低它的执行频率。当遇到高频触发的事件时，这样的限制显得尤为重要。
 **/

// 返回一个函数，that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.

function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

// Usage
var myEfficientFn = debounce(function() {
    // All the taxing stuff you do
}, 250);
window.addEventListener('resize', myEfficientFn);


/**
 * 设定时间/频率循环检测函数
 * 上面提到的 debounce 函数是借助于某个事件的触发。但有时候并没有这样的事件可用，那我们只能自己写一个函数来每隔一段时间检查一次。
**/

function poll (fn, callback, err, timeout, interval) {
    var startTime = (new Date()).getTime();
    var pi = window.setInterval(function(){
        if (Math.floor(((new Date).getTime() - startTime) / 1000) <= timeout) {
            if (fn()) {
                callback();
            }
        } else {
            window.clearInterval(pi);
            err();
        }
    }, interval)
}


/**
 * 禁止重复调用、只允许执行一次的once 函数
 * 很多时候，我们只希望某种动作只能执行一次，就像是我们使用 onload 来限定只在加载完成时执行一次。下面这个函数就能让你的操作执行一次后就不会再重复执行。
 * 这个 once 函数能够保证你提供的函数只执行唯一的一次，防止重复执行。
 **/

function once(fn, context) {
    var result;

    return function() {
        if(fn) {
            result = fn.apply(context || this, arguments);
            fn = null;
        }

        return result;
    };
}

// Usage
var canOnlyFireOnce = once(function() {
    console.log('Fired!');
});

canOnlyFireOnce(); // "Fired!"
canOnlyFireOnce(); // nada


/**
 * 获取一个链接的绝对地址 getAbsoluteUrl
 * 获取链接的绝对地址并不像你想象的那么简单。下面就是一个非常实用的函数，能根据你输入的相对地址，获取绝对地址：
 * 这里使用了 a 标签 href 来生成完整的绝对URL，十分的可靠。
 */

var getAbsoluteUrl = (function() {
    var a;

    return function(url) {
        if(!a) a = document.createElement('a');
        a.href = url;

        return a.href;
    };
})();

// Usage
getAbsoluteUrl('/something'); // http://www.webhek.com/something


/**
 * 判断一个JavaScript函数是否是系统原生函数 isNative
 * 很多第三方js脚本都会在全局变量里引入新的函数，有些甚至会覆盖掉系统的原生函数，下面这个方法就是来检查是不是原生函数的：
 * 这个方法虽然不是那么的简洁，但还是可以完成任务的！
 */

;(function() {

    // Used to resolve the internal `[[Class]]` of values
    var toString = Object.prototype.toString;

    // Used to resolve the decompiled source of functions
    var fnToString = Function.prototype.toString;

    // Used to detect host constructors (Safari > 4; really typed array specific)
    var reHostCtor = /^\[object .+?Constructor\]$/;

    // Compile a regexp using a common native method as a template.
    // We chose `Object#toString` because there's a good chance it is not being mucked with.
    var reNative = RegExp('^' +
            // Coerce `Object#toString` to a string
        String(toString)
            // Escape any special regexp characters
            .replace(/[.*+?^${}()|[\]\/\\]/g, '\\$&')
            // Replace mentions of `toString` with `.*?` to keep the template generic.
            // Replace thing like `for ...` to support environments like Rhino which add extra info
            // such as method arity.
            .replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
    );

    function isNative(value) {
        var type = typeof value;
        return type == 'function'
            // Use `Function#toString` to bypass the value's own `toString` method
            // and avoid being faked out.
            ? reNative.test(fnToString.call(value))
            // Fallback to a host object check because some environments will represent
            // things like typed arrays as DOM methods which may not conform to the
            // normal native pattern.
            : (value && type == 'object' && reHostCtor.test(toString.call(value))) || false;
    }

    // export however you want
    module.exports = isNative;
}());

// Usage
isNative(alert); // true
isNative(myCustomFunction); // false


/**
 * 用JavaScript创建新的CSS规则 insertRule
 * 有时候我们会使用一个CSS选择器(比如 document.querySelectorAll)来获取一个 NodeList ，然后给它们每个依次修改样式。其实这并不是一种高效的做法，高效的做法是用JavaScript新建一段CSS样式规则：
 * 这些做法的效率非常高，在一些场景中，比如使用ajax新加载一段html时，使用上面这个方法，你不需要操作新加载的html内容。
 * **/

// Build a better Sheet object
Sheet = (function() {
    // Build style
    var style = document.createElement('style');
    style.setAttribute('media', 'screen');
    style.appendChild(document.createTextNode(''));
    document.head.appendChild(style);

    // Build and return a single function
    return function(rule){ style.sheet.insertRule( rule, style.sheet.cssRules.length ); } ;
})();

// Then call as a function
Sheet(".stats { position: relative ; top: 0px }") ;


/**
 * 判断网页元素是否具有某种属性和样式 matchesSelector
 **/

function matchesSelector(el, selector) {
    var p = Element.prototype;
    var f = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || function(s) {
            return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
        };
    return f.call(el, selector);
}

// Usage
matchesSelector(document.getElementById('myDiv'), 'div.someSelector[some-attribute=true]')