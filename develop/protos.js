//import {sendCrashReport} from './utils.js'



/*if (isHRM) {
    module.hot.accept()
}*/

/*

import SVG from 'svg';


SVG.extend(SVG.Shape, SVG.Container, {
    title: function (text) {
        var title = document.createElementNS("http://www.w3.org/2000/svg", "title");
        title.textContent = text;
        this.node.appendChild(title);
        return this;
    }
});
*/

//Strings
String.prototype.trim || (String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, '');
});

String.prototype.splice || (String.prototype.splice = function (idx, rem, s) {
    return (this.slice(0, idx) + s + this.slice(idx + Math.abs(rem)));
});

Date.prototype.daysInMonth = function () {
    return 33 - new Date(this.getFullYear(), this.getMonth(), 33).getDate();
};

Math.smartRound = function (num, point) {
    var factor = 1

    for (let i = 0; i < point; ++i) {
        factor *= 10
    }

    return Math.round(num * factor) / factor

}

Object.defineProperty(Array.prototype, 'getPercentRelation', {
    value: function (Round) {

        let _100 = this.reduce(function (res, val) {
            return res + val
        });//Посчитать сумму всех аргументов

        //Если хоть кто-то есть
        if (_100) {

            var arrRes = [],
                intermediate = 0;

            //Считаем всех кроме последнего
            for (var i = 0; i < this.length - 1; i++) {
                arrRes.push(Math.smartRound((this[i] * 100) / _100, Round))
                intermediate += arrRes[i]
            }

            //Последний считаем вычетом всех предыдущих из 100 чтобы сошлись их общая сумма значений с учетом округлений
            arrRes.push(100 - intermediate)

            return arrRes
        } else {
            return this.map((val)=> {
                return 0
            });
        }
    },
    enumerable: false
});

/*window.onerror = function (mes, url, line, column, errObj) {

    sendCrashReport(url, errObj, line, column, mes)

};*/

// Сделаем свой класс ошибок для конструкции Try Catch
/*window.TryCatchError = function (message, envirenment) {
    this.name = "TryCatchError";

    var count = 0;

    function replace(obj) {
        count += 1

        for (let key in obj) {

            //если

            if (typeof (obj[key]) === "undefined" || String(obj[key]) === 'NaN' || String(obj[key]) === 'null' || String(obj[key]) === 'Infinity' || String(obj[key]) === '-Infinity') {
                obj[key] = String(obj[key])
            }

            if (typeof (obj[key]) === "object") {
                replace(obj[key])
            }
        }
    }

    envirenment && replace(envirenment)


    this.ENVIRENMENT = JSON.stringify(envirenment, undefined, count)

    this.message = message;

    if (Error.captureStackTrace) {
        Error.captureStackTrace(this, TryCatchError);
    } else {
        this.stack = (new Error()).stack;
    }

}

TryCatchError.prototype = Object.create(Error.prototype);*/


//Полифильчики для недостающих методов
(function (e) {
    e.matches = e.matches || e.webkitMatchesSelector || e.mozMatchesSelector || e.msMatchesSelector || function (s) {
            return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
        };

    e.closest = e.closest || function (css) {
            var node = this;

            while (node) {
                if (node.matches(css)) return node;
                else node = node.parentElement;
            }
            return null;
        };


}(Element.prototype));

//Полифил для requestAnimationFrame
(function () {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame']
            || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function (callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function () {
                    callback(currTime + timeToCall);
                },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
}());




(function () {
    if (!String.prototype.startsWith) {
        String.prototype.startsWith = function (searchString, position) {
            position = position || 0;
            return this.substr(position, searchString.length) === searchString;
        };
    }
})();


(function(){
// Warn if overriding existing method
    if(Array.prototype.equals)
        console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
    Array.prototype.equals = function (array) {
        // if the other array is a falsy value, return
        if (!array)
            return false;

        // compare lengths - can save a lot of time
        if (this.length != array.length)
            return false;

        for (var i = 0, l=this.length; i < l; i++) {
            // Check if we have nested arrays
            if (this[i] instanceof Array && array[i] instanceof Array) {
                // recurse into the nested arrays
                if (!this[i].equals(array[i]))
                    return false;
            }
            else if (this[i] != array[i]) {
                // Warning - two different object instances will never be equal: {x:20} != {x:20}
                return false;
            }
        }
        return true;
    }
// Hide method from for-in loops
    Object.defineProperty(Array.prototype, "equals", {enumerable: false});

})();