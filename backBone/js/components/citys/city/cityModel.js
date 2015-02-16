define(['Vendor'],function(Vendor){

    'use strict';

    var _ = Vendor ._,
        Backbone=Vendor.Backbone,
        CityModel;

    CityModel = Backbone.Model.extend({

        url:'#some',

        defaults:{
            city:'Kharkov',
            country:'Ukraine',
            hours:'10',
            minutes:'20'
        }
    });

return CityModel;

});

