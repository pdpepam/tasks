define(['Vendor'],function(Vendor){

    'use strict';

    var _ = Vendor ._,
        Backbone=Vendor.Backbone,
        LocalStorage;

    LocalStorage = Backbone.Collection.extend({



        initialize:function(){
            localStorage.setItem('aaaaa','123')
        },

        add:function(name,value){
            if(Modernizr.localstorage){
                localStorage.setItem(name,JSON.stringify(value));
                return localStorage
            }
        },

        clear:function(){
            localStorage.clear()
        }
    });

    return new LocalStorage();

});

