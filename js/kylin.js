/*!
 * Kylin JavaScript Library v0.1
 * Author:    QiHan Wang
 * Date:      2014-07-15 T15:15Z
 * Explain:   UI Script
 * Tel:       15828058953
 * Email:     Whenhan@foxmail.com
 * Statement: Can be reproduced, but without the author's permission, shall not modify in any form, sales, and other commercial purposes.
 *            Reprint, please keep this script annotation information at the same time,
 *            Believe that you are a good respect others work achievement, peace be to the good life.
 *            This script has not yet been implemented all functions, is part of the Bug, the Bug of the repair will be done in future.
 */


var client = function(){
    //rendering engines
    var engine = {
        ie: 0,
        gecko: 0,
        webkit: 0,
        khtml: 0,
        opera: 0,
        //complete version
        ver: null
    };
    //browsers
    var browser = {
        ie: 0,
        firefox: 0,
        safari: 0,
        konq: 0,
        opera: 0,
        chrome: 0,
        //specific version
        ver: null
    };
    //platform/device/OS
    var system = {
        win: false,
        mac: false,
        x11: false,

        //mobile devices
        iphone: false,
        ipod: false,
        ipad: false,
        ios: false,
        android: false,
        nokiaN: false,
        winMobile: false,

        //game systems
        wii: false,
        ps: false
    };

    //detect rendering engines/browsers
    var ua = navigator.userAgent;
    if (window.opera){
        engine.ver = browser.ver = window.opera.version();
        engine.opera = browser.opera = parseFloat(engine.ver);
    } else if (/AppleWebKit\/(\S+)/.test(ua)){
        engine.ver = RegExp["$1"];
        engine.webkit = parseFloat(engine.ver);

        //figure out if it's Chrome or Safari
        if (/Chrome\/(\S+)/.test(ua)){
            browser.ver = RegExp["$1"];
            browser.chrome = parseFloat(browser.ver);
        } else if (/Version\/(\S+)/.test(ua)){
            browser.ver = RegExp["$1"];
            browser.safari = parseFloat(browser.ver);
        } else {
            //approximate version
            var safariVersion = 1;
            if (engine.webkit < 100){
                safariVersion = 1;
            } else if (engine.webkit < 312){
                safariVersion = 1.2;
            } else if (engine.webkit < 412){
                safariVersion = 1.3;
            } else {
                safariVersion = 2;
            }

            browser.safari = browser.ver = safariVersion;
        }
    } else if (/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)){
        engine.ver = browser.ver = RegExp["$1"];
        engine.khtml = browser.konq = parseFloat(engine.ver);
    } else if (/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)){
        engine.ver = RegExp["$1"];
        engine.gecko = parseFloat(engine.ver);

        //determine if it's Firefox
        if (/Firefox\/(\S+)/.test(ua)){
            browser.ver = RegExp["$1"];
            browser.firefox = parseFloat(browser.ver);
        }
    } else if (/MSIE ([^;]+)/.test(ua) || /rv:([^\)]+)/.test(ua)){
        engine.ver = browser.ver = RegExp["$1"];
        engine.ie = browser.ie = parseFloat(engine.ver);
    }

    //detect browsers
    browser.ie = engine.ie;
    browser.opera = engine.opera;


    //detect platform
    var p = navigator.platform;
    system.win = p.indexOf("Win") == 0;
    system.mac = p.indexOf("Mac") == 0;
    system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);

    //detect windows operating systems
    if (system.win){
        if (/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(ua)){
            if (RegExp["$1"] == "NT"){
                switch(RegExp["$2"]){
                    case "5.0":
                        system.win = "2000";
                        break;
                    case "5.1":
                        system.win = "XP";
                        break;
                    case "6.0":
                        system.win = "Vista";
                        break;
                    case "6.1":
                        system.win = "7";
                        break;
                    case "6.2":
                        system.win = "8";
                        break;
                    case "6.3":
                        system.win = "8.1";
                        break;
                    default:
                        system.win = "NT";
                        break;
                }
            } else if (RegExp["$1"] == "9x"){
                system.win = "ME";
            } else {
                system.win = RegExp["$1"];
            }
        }
    }

    //mobile devices
    system.iphone = ua.indexOf("iPhone") > -1;
    system.ipod = ua.indexOf("iPod") > -1;
    system.ipad = ua.indexOf("iPad") > -1;
    system.nokiaN = ua.indexOf("NokiaN") > -1;
    system.winMobile = (system.win == "CE");

    //determine iOS version
    if (system.mac && ua.indexOf("Mobile") > -1){
        if (/CPU (?:iPhone )?OS (\d+_\d+)/.test(ua)){
            system.ios = parseFloat(RegExp.$1.replace("_", "."));
        } else {
            system.ios = 2;  //can't really detect - so guess
        }
    }

    //determine Android version
    if (/Android (\d+\.\d+)/.test(ua)){
        system.android = parseFloat(RegExp.$1);
    }

    //gaming systems
    system.wii = ua.indexOf("Wii") > -1;
    system.ps = /playstation/i.test(ua);

    //return it
    return {
        engine:     engine,
        browser:    browser,
        system:     system
    };

}();

var kylin = {
    on: function(elem, type, fn){
        if(elem.addEventListener){
            elem.addEventListener(type, fn, false);
        }else if(elem.attachEvent){
            elem.attachEvent('on' + type, fn);
        }else{
            elem['on' + type] = fn;
        }
    },
    off: function(elem, type, fn){
        if(elem.removeEventListener){
            elem.removeEventListener(type, fn, false);
        }else if(elem.detachEvent){
            elem.detachEvent('on' + type, fn);
        }else{
            elem['on'+ type] = null;
        }
    },
    getEvent: function(event){
        return event ? event : window.event;
    },
    getTarget: function(event){
        return event.target || event.srcElement;
    },
    preventDefault: function(event){
        if(event.preventDefault){
            event.preventDefault();
        }else{
            event.returnValue = false;
        }
    },
    stopPropagation: function(event){
        if(event.stopPropagation){
            event.stopPropagation();
        }else{
            event.cancelBubble = true;
        }
    },
    //获取鼠标按键
    getButton: function(event){
        if(document.implementation.hasFeature("MouseEvent","2.0")){
            return event.button;
        }else{
            switch(event.button){
                case 0:
                case 1:
                case 3:
                case 5:
                case 7:
                    return 0;
                case 2:
                case 6:
                    return 2;
                case 4: return 1;
            }
        }
    },
    //鼠标滚动方向及转弧
    getWheelDelta: function(event){
        if(event.wheelDelta){
            return (client.engine.opera && client.engine.opera < 9.5 ? -event.wheelDelta : event.wheelDelta);
        } else{
            return -event.detail*40;
        }
    },
    //获取键盘按键
    getCharCode: function(event){
        if(typeof event.charCode == "number"){
            return event.charCode;
        }else{
            return event.keyCode;
        }
    },
    //获取相关元素，只对于mouseover、mouseout事件才包含值；其他事件该属性值是null
    getRelatedTarget: function(event){
        if(event.relatedTarget){
            return event.relatedTarget;
        }else if(event.toElement){
            return event.toElement;
        }else if(event.fromElement){
            return event.fromElement;
        }else{ return null; }
    },
    getClipboardText: function(event){
        var clipboardData = (event.clipboardData || window.clipboardData);
        return clipboardData.getData("text");
    },
    setClipboardText: function(event, value){
        if(event.clipboardData){
            event.clipboardData.setData("text/plain", value);
        }else if(window.clipboardData){
            window.clipboardData.setData("text", value);
        }
    },
    //处理函数在页面加载完成时执
    addLoadEvent: function(func){
        var oldonload = window.onload;
        if(typeof window.onload != 'function'){
            window.onload = func;
        }else{
            window.onload = function(){
                oldonload();
                func();
            }
        }
    },
    //INSERTAFTER 向后插入函数
    insertAfter: function(insertedNode, adjacentNode){
        var parent = adjacentNode.parentNode;
        if(parent.lastChild == insertedNode){
            parent.appendChild(insertedNode);
        }else{
            parent.insertBefore(insertedNode,adjacentNode.nextSibling);
        }
    },
    //CLASS 类名查找
    getElementsByClassName: function(node, classname){
        if(node.getElementsByClassName){
            return node.getElementsByClassName(classname);
        }else{
            var results = [];
            var elems  = node.getElementsByTagName('*');
            for(var i = 0; i< elems.length; i++){
                if(elems[i].className.indexOf(classname) > -1){
                    results[results.length] = elems[i];
                }
            }
            return results;
        }
    },
    //事件触发，此处暂时为Mouseout，后续应扩展为所有事件 具体参考是jQuery trigger事件方法
    simulateClick: function(elem) {
        var evt;
        if (document.createEvent) {
            evt = document.createEvent("MouseEvents");
            evt.initMouseEvent("mouseout", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            elem.dispatchEvent(evt);
        } else if (elem.fireEvent) {
            elem.fireEvent('onmouseout');
        }
    }
};
//
/*可以转载，但未经作者允许，不得以任何形式修改，销售，以及其它商业用途，请转载同时保留本脚本的注释信息，相信你是一个尊重他人劳动成果的好人，愿好人一生平安。
 本脚本尚未实现全部功能，尚存在部分Bug，Bug的修复将在后续完成。*/
/*==================================*/
function m(el){
    document.getElementById(el);
    document.getElementsByClassName(el);
    document.getElementsByTagName(el);
    return kylin;
}
/*==================================*/

function EventTarget(){
    this.handlers = {};
}

EventTarget.prototype = {
    constructor: EventTarget,

    on: function(type, handler){
        if (typeof this.handlers[type] == "undefined"){
            this.handlers[type] = [];
        }

        this.handlers[type].push(handler);
    },

    fire: function(event){
        if (!event.target){
            event.target = this;
        }
        if (this.handlers[event.type] instanceof Array){
            var handlers = this.handlers[event.type];
            for (var i=0, len=handlers.length; i < len; i++){
                handlers[i](event);
            }
        }
    },

    off: function(type, handler){
        if (this.handlers[type] instanceof Array){
            var handlers = this.handlers[type];
            for (var i=0, len=handlers.length; i < len; i++){
                if (handlers[i] === handler){
                    break;
                }
            }

            handlers.splice(i, 1);
        }
    }
};



var DragDrop = function(){
    var dragdrop = new EventTarget(),
        dragging = null,
        diffX = 0,
        diffY = 0;

    function handleEvent(event){
        //get event and target
        event = kylin.getEvent(event);
        var target = kylin.getTarget(event);

        //determine the type of event
        switch(event.type){
            case "mousedown":
                if (target.className.indexOf("draggable") > -1){
                    dragging = target;
                    diffX = event.clientX - target.offsetLeft;
                    diffY = event.clientY - target.offsetTop;
                    dragdrop.fire({type:"dragstart", target: dragging, x: event.clientX, y: event.clientY});
                }
                break;

            case "mousemove":
                if (dragging !== null){

                    //assign location
                    dragging.style.left = (event.clientX - diffX) + "px";
                    dragging.style.top = (event.clientY - diffY) + "px";

                    //fire custom event
                    dragdrop.fire({type:"drag", target: dragging, x: event.clientX, y: event.clientY});
                }
                break;

            case "mouseup":
                dragdrop.fire({type:"dragend", target: dragging, x: event.clientX, y: event.clientY});
                dragging = null;
                break;
        }
    };

    //public interface
    dragdrop.enable = function(){
        kylin.on(document, "mousedown", handleEvent);
        kylin.on(document, "mousemove", handleEvent);
        kylin.on(document, "mouseup", handleEvent);
    };

    dragdrop.disable = function(){
        kylin.off(document, "mousedown", handleEvent);
        kylin.off(document, "mousemove", handleEvent);
        kylin.off(document, "mouseup", handleEvent);
    };

    return dragdrop;
}();


//====================================================================================================================================
DragDrop.enable();

DragDrop.on("dragstart", function(event){
    //var status = document.getElementById("status");
//	status.innerHTML = "Started dragging " + event.target.id;
});

DragDrop.on("drag", function(event){
//	var status = document.getElementById("status");
//	status.innerHTML += "<br>Dragged " + event.target.id + " to (" + event.x + "," + event.y + ")";
});

DragDrop.on("dragend", function(event){
//	var status = document.getElementById("status");
//	status.innerHTML += "<br>Dropped " + event.target.id + " at (" + event.x + "," + event.y + ")";
});