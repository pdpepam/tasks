define([], function () {
    'use strict';

    var Convertor = function (){};

    function _adduction(offset){
        var ms = null,
            localTime = null,
            time = null;

         ms = ms||0;
         localTime = new Date();
         time = new Date(localTime.getUTCFullYear(), localTime.getUTCMonth(), localTime.getUTCDate(), (localTime.getUTCHours() + offset),(localTime.getUTCMinutes() + offset),(localTime.getUTCSeconds() + offset));

     return time;
    }

    Convertor.getSeconds = function (offset, ms) {
        var time = null,
            getSec = null;

        time = _adduction(offset,ms);
        getSec=time.getSeconds();

     return (getSec< 10) ? '0'+getSec:getSec;
    };

    Convertor.getMinutes = function (offset,ms) {
        var time = null,
            getMin = null;

        time = _adduction(offset,ms);
        getMin=time.getMinutes();

    return (getMin< 10) ? '0'+getMin:getMin;
    };

    Convertor.getHours = function (offset,ms) {
        var time = null,
            getHours = null;

        time = _adduction(offset,ms);
        getHours=time.getHours();

        return (getHours< 10) ? '0'+getHours:getHours;
    };

    return Convertor;
});