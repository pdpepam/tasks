define(['Vendor'],function(Vendor){

    'use strict';

    var _ = Vendor ._,
        Backbone=Vendor.Backbone,
        CityModel;

    CityModel = Backbone.Model.extend({

        url:'#some',

        defaults:{
            city    :'undefine',
            country :'undefine',
            hours   :'0',
            minutes :'0'
        }
    });

return CityModel;

});

