/**
 * JavaScript版几种常见排序算法
 *
 * 冒泡排序：最简单，也最慢，貌似长度小于7最优
 * 插入排序： 比冒泡快，比快速排序和希尔排序慢，较小数据有优势
 * 快速排序：这是一个非常快的排序方式，V8的sort方法就使用快速排序和插入排序的结合
 * 希尔排序：在非chrome下数组长度小于1000，希尔排序比快速更快
 * 系统方法：在forfox下系统的这个方法非常快
 * 人**/

var jsSort = {
    // 利用sort进行排序
    systemSort: function (arr) {
        return arr.sort(function (a, b) {
            return a - b;
        });
    },
    // 冒泡排序
    bubbleSort: function (arr) {
        var i = arr.length, j, tempExchangVal;
        while (i > 0) {
            for (j = 0; j < i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    tempExchangVal = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = tempExchangVal;
                }
            }
            i--;
        }
        return arr;
    },

    // 快速排序
    quickSort: function (arr) {
        function sort(prev, numsize) {
            var nonius = prev;
            var j = numsize - 1;
            var flag = arr[prev];
            if ((numsize - prev) > 1) {
                while (nonius < j) {
                    for (; nonius < j; j--) {
                        if (arr[j] < flag) {
                            arr[nonius++] = arr[j];　//a[i] = a[j]; i += 1;
                            break;
                        }
                        ;
                    }
                    for (; nonius < j; nonius++) {
                        if (arr[nonius] > flag) {
                            arr[j--] = arr[nonius];
                            break;
                        }
                    }
                }
                arr[nonius] = flag;
                sort(0, nonius);
                sort(nonius + 1, numsize);
            }
        }

        sort(0, arr.length);
        return arr;
    },
    //插入排序
    insertSort: function (arr) {
        var i = 1, j, len = arr.length, key;
        for (; i < len; i++) {
            j = i;
            key = arr[j];
            while (--j > -1) {
                if (arr[j] > key) {
                    arr[j + 1] = arr[j];
                }
                else {
                    break;
                }
            }
            arr[j + 1] = key;
        }
        return arr;
    },
    // 希尔排序
    shellSort: function (arr) {
        var len = arr.length;
        for (var fraction = Math.floor(len / 2); fraction > 0; fraction = Math.floor(fraction / 2)) {
            for (var i = fraction; i < len; i++) {
                for (var j = i - fraction; j >= 0 && arr[j] > arr [fraction + j]; j -= fraction) {
                    var temp = arr[j];
                    arr[j] = arr[fraction + j];
                    arr[fraction + j] = temp;
                }
            }
        }

        return arr;
    }
}