define(['Vendor',
    'text!./search.html',
    'components/services/Autocomplete',
    'observer'],function(Vendor,
                         Template,
                         Autocomplete,
                         Observer){

    'use strict';

    var $=Vendor.$,
        _=Vendor._,
        Backbone=Vendor.Backbone,
        searchView;

    searchView=Backbone.View.extend({

        events:{
            'keyup .search-city':"findCity"
        },

        initialize:function(){
            this.template= _.template(Template);
            this.render();
        },

        render:function(){
            var view=this.template();
            this.$el.html(view)
        },

        findCity:function(event){
            var el = event.target;
            var value = $(el).val();
            var findCites = new Autocomplete(value);

            $.when(findCites.promise).done(function(){
                Observer.trigger('getAutocomplete',findCites.data);
            })
        }
    });

    return searchView;

});