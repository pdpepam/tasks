define(['Vendor'],function(Vendor) {

    'use strict';

    var _ = Vendor._,
        Backbone = Vendor.Backbone,
        LocalStorage;

    LocalStorage = function(){

        var  localRepository = localStorage;

        /*
        * Modernizr library is used for checking the localStorage accessibility
        * */
        var checkLocal = Modernizr.localstorage;

        this.length = function (){
            return localStorage.length
        }
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

        this.getItem = function(key){
           return localStorage.getItem(key)
        };

        this.setItem = function(key,val){
            localStorage.setItem(key,val)
        };

        this.getItems = function(){
            if (checkLocal) {
                return localRepository;
            }
        };

    };

  return new LocalStorage();

});

