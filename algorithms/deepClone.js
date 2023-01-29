/**
 * 对象深度克隆
 * */

function clone(obj){
    var buf;
    switch (Object.prototype.toString.call(obj)){
        case '[object Array]':
            buf = [];
            var i =  obj.length;
            while (i--){
                buf[i] = clone(obj[i]);
            }
            break;
        case '[object JSON]':
            if(window.JSON){
                buf ={};
                for(var i in obj){
                    buf[i] = clone(obj[i])
                }
                return buf;
            }
            break;
        default:
            return obj;
            break;
    }


  /*  if(obj instanceof Array){
        buf = [];
        var i = obj.length;
        while (i--){
            buf[i] = clone(obj[i]);
        }
        return buf;
    }else if(obj instanceof Object){
        buf = {};
        for (var k in obj){
            buf[k] = clone(obj[k]);
        }
        return buf;
    }else{
        return obj;
    }*/
}