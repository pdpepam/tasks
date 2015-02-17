define(['Vendor'],function(Vendor){

    'use strict';

    var _ = Vendor ._,
        Backbone=Vendor.Backbone,
        ClockModel;

    ClockModel = Backbone.Model.extend({

        defaults:{
            hours  : '00',
            minutes: '00'
        },

        validate: function(attr){
            if(attr.hours>24||attr.hours<0){
                console.log('hours don\'t can be more 24  and less 0')
            };

            if(attr.minutes>60||attr.minutes<0){
                console.log('minutes don\'t can be more 60 and less 0')
            };
        }

    });

    return ClockModel;

});

