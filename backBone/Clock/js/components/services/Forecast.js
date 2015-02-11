define(['Vendor'], function (Vendor) {

    'use strict';

    var _ = Vendor._,
        $ = Vendor.$,
        Backbone=Vendor.Backbone,
        Model;

    Model = Backbone.Model.extend({

        defaults: {
            APIKEY : '2294241a4a509e5c7aabcffe6f5ed44c'
        },

        initialize: function (id, city) {
            this.citys=null;
            this.cord = null;
            this.forecast=null;
            this.promise = $.Deferred();
            this.citys=city;
            this._getData(id)
        },

        /**
         **Get data from Api
         */
        _getData: function (id) {
            var self = this,
                map = $('<div>').get(0),
                service,
                options = {
                    reference: id
                };

            service = new google.maps.places.PlacesService(map);

            service.getDetails(options, function (place, status) {

                if (status == 'OK') {

                    //Get longitude and latitude of citys
                    self.cord = place.geometry.location;

                    /*Using  longitude and latitude of citys for getting
                     wheather information*/
                    self._getForecast(self);
                }else {
                    throw new Error('Server error, check your connection ' + status);
                }
            })
        },

        //get info from google Forecast
        _getForecast: function (self) {

            //get citys url
            var url = 'https://api.forecast.io/forecast/91cb318ae9c4109ad10717f52100759f/' + this.cord.k + ',' + this.cord.D + '?callback=?';

            $.getJSON(url, function (data, status) {
                self.forecast = data;

                self.promise.resolve();

            })
                .fail(function (data, status) {
                    console.log(status + " error");
                });
        }
    });


    return Model;

});