define(['Vendor'],function(Vendor){

    'use strict';

    var _ = Vendor ._,
        Backbone=Vendor.Backbone,
        LocalStorage;

    LocalStorage = Backbone.Collection.extend({
        //'locaslStorage': new Backbone.LocalStorage()
    })
    return LocalStorage;

});

