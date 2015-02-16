define(['Vendor'],function(Vendor){
    'use strict';

    var Backbone = Vendor.Backbone,
        Router = null;



    Router=Backbone.Router.extend({
       routes:{
           '#some':'some'
       },

       some:function(){
           console.log('rout is work')
       }
    });


    return new Router();
});