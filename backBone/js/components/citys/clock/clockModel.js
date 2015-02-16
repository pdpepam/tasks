define(['Vendor'],function(Vendor){

    'use strict';

    var _ = Vendor ._,
        Backbone=Vendor.Backbone,
        ClockModel;

    ClockModel = Backbone.Model.extend({

        defaults:{
            hours  : '00',
            minutes: '00',
            seconds: '00'
        }
    });

    return ClockModel;

});

