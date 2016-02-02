// JavaScript Document

//查找兄弟节点
function sibling(elem){
    var r = [];
    var n = elem.parentNode.firstChild;
    for( ;n;n=n.nextSibling){
        if(n.nodeType === 1 && n !==elem){
            r.push(n);
        }
    }
    return r;
}

//默认执行某个事件
function simulateClick(el) {
    var evt;
    if (document.createEvent) { // DOM Level 2 standard
        evt = document.createEvent("MouseEvents");
        evt.initMouseEvent("mouseout", true, true, window,
            0, 0, 0, 0, 0, false, false, false, false, 0, null);
        el.dispatchEvent(evt);
    } else if (el.fireEvent) { // IE
        el.fireEvent('onmouseout');
    }
}

a

function index(current, obj){
    for (var i = 0;i < obj.length; i++) {
        if (obj[i] == current) {
            return i;
        }
    }
}


function hasClass( elements,cName ){
    return !!elements.className.match( new RegExp( "(\\s|^)" + cName + "(\\s|$)") ); // ( \\s|^ ) 判断前面是否有空格 （\\s | $ ）判断后面是否有空格 两个感叹号为转换为布尔值 以方便做判断
};
function addClass( elements,cName ){
    if( !hasClass( elements,cName ) ){
        elements.className += " " + cName;
    };
};
function removeClass( elements,cName ){
    if( hasClass( elements,cName ) ){
        elements.className = elements.className.replace( new RegExp( "(\\s|^)" + cName + "(\\s|$)" )," " ); // replace方法是替换
    };
};

// 网页复制禁止
(function () {
    'use strict';

    // 禁止Shift Alt Ctrl
    document.onkeydown = function () {
        if (event.shiftKey || event.altKey || event.ctrlKey) {
            return false;
        }
    }

    // 鼠标右键屏蔽
    if (window.Event) {
        document.captureEvents(Event.MOUSEUP);
    }
    function disableContextMenu() {
        event.cancelBubble = true
        event.returnValue = false;
        return false;
    }

    function disableRightClick(e) {
        if (window.Event) {
            if (e.which == 2 || e.which == 3)
                return false;
        }
        else if (event.button == 2 || event.button == 3) {
            event.cancelBubble = true
            event.returnValue = false;
            return false;
        }
    }

    // 禁右键
    document.oncontextmenu = disableContextMenu;   // for IE5+
    document.onmousedown = disableRightClick;   // for all others


    // 禁止选中代码
    document.onselectstart = function (event) {
        event.returnValue = false;
    }

    // 禁止选择文本
    var omitformtags = ['input', 'textarea', 'select'];
    omitformtags = omitformtags.join('|');
    function disableSelect(e) {
        if (omitformtags.indexOf(e.target.tagName.toLowerCase()) == -1);
        {
            return false;
        }
    }

    function reEnable() {
        return true;
    }

    if (typeof document.onselectstart != 'undefined') {
        document.onselectstart = function () {
            return false;
        }
    }
    else {
        document.onmousedown = disableSelect;
        document.onmouseup = reEnable;
    }

})();