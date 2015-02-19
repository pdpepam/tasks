define(['Vendor'],function(Vendor){

    'use strict';

    var _ = Vendor ._,
        Backbone=Vendor.Backbone,
        ClockModel;

    ClockModel = Backbone.Model.extend({

        defaults:{
            hours  : '?',
            minutes: '?',
            seconds: '? '
        }
    });

    return ClockModel;

});

