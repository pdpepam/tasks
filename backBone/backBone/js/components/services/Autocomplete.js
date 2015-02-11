define(['Vendor'], function (Vendor) {
    'use strict';

    var $ = Vendor.$,
        _ = Vendor._,
        Backbone = Vendor.Backbone,
        SearchModel;

    SearchModel = Backbone.Model.extend({

        /**
         * Model take string on input and returns id and description of find place
         * */
        urlRoot: 'some',

        initialize: function (str) {

            this.id = null;
            this.data = null;
            this.promise = $.Deferred();

            var selfsendRequest = this,
                autoComplete,
                options = {
                    input: str
                };

            autoComplete = new google.maps.places.AutocompleteService(null, {types: ['cities']});

            autoComplete.getPlacePredictions(options, function (data, status) {
                if (status == "OK") {

                    selfsendRequest.data = data;
                    selfsendRequest.promise.resolve();

                } else {
                    throw new Error('Server error, check your connection ' + code);
                }
            });
        }
    });

    return SearchModel;

});