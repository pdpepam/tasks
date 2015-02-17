define(['Vendor'],function(Vendor) {

    'use strict';

    var _ = Vendor._,
        Backbone = Vendor.Backbone,
        LocalStorage;

    LocalStorage = function(){

        var  localRepository = localStorage;

        var checkLocal=Modernizr.localstorage;

        this.addItem = function (name, value) {
            if (checkLocal) {
                localStorage.setItem(name, JSON.stringify(value));
                return localStorage
            }
        };

        this.removeItem = function(key){
            localStorage.removeItem(key);
        };

        this.clear = function () {
            if(checkLocal){
                localStorage.clear()
            }
        };

        this.getItems = function(){
            if (checkLocal) {
                return localRepository;
            }
        };

    };

  return new LocalStorage();

});

