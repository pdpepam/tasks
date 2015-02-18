require.config({

    baseUrl: 'js',

    paths: {
        'jquery'   : 'libs/jquery-2.1.3',
        'lodash'   : 'libs/lodash',
        'Backbone' : 'libs/backbone',
        'text'     : 'libs/text',
        'observer' : 'observer',
        'routes'   : 'routes',
        'constans' : 'constans'
    },

    shim: {

        'jquery': {
            exports: '$'
        },

        'lodash': {
            exports: '_'
        },

        'Backbone': {
            exports: 'Backbone',
            deps: ['jquery', 'lodash']
        }
    },

    map: {
        '*': {
            'underscore': 'lodash'
        }
    },

    packages: ['Vendor']

});


define('main',
    ['Vendor',
     'observer',
     'constans',
     'components/services/LocalStorage',
     'routes',
     'components/services/Forecast',
     'components/search/searchView',
     'components/dropList/dropListView',
     'components/citys/citysView',
     'components/citys/clock/clockView',
     'components/citys/alarm/alarmView'
    ],

    function (Vendor,
              Observer,
              Constans,
              LocalStorage,
              Routes,
              Forecast,
              SearchView,
              DropListView,
              CitesView,
              ClockView,
              AlarmView  ) {

        'use strict';

        var Holders = null,
            searchView = null,
            dropListView = null,
            citesView = null,
            History;

        History = Backbone.history.start();

        Holders = {
            'searchHolder': '.google-search',
            'dropListHolder': '.auto-cites',
            'citysHolder': '.finded-cites tbody'
        };

        searchView = new SearchView({el: Holders.searchHolder});
        dropListView = new DropListView({el: Holders.dropListHolder});
        citesView = new CitesView({el: Holders.citysHolder});


        /**
         * Search city using Google Autocomplete
         * */
        Observer.on('getAutocomplete', getAutocomplete);

        /**
         * Select city from dropList*/
        Observer.on('selectGoogle', selectGoogleCity);

        /**
         * On ready CityView
         * */
        Observer.on('readyCity', readyCity);

        function getAutocomplete(data) {

            dropListView.collection.reset();

            _.forEach(data, function (item) {
                var BackboneModel = Backbone.Model.extend({defaults: {city: 'city'}}),

                    model = new BackboneModel({
                        'city': item.terms[0].value,
                        'country': item.terms[item.terms.length - 1].value,
                        'reference': item.reference
                    });

                dropListView.collection.add(model);
            });
        }

        function selectGoogleCity(data) {
            var forecast,
                json;

            json = data.toJSON();
            forecast = new Forecast(json.reference, json.city);

            $.when(forecast.promise).done(function () {
                var self = this,
                    itemView = null,
                    BackboneModel = null,
                    model = null;

                BackboneModel = Backbone.Model.extend({});

                model = new BackboneModel({
                    city: json.city,
                    country: json.country,
                    offset: forecast.forecast.offset
                });

                citesView.collection.add(model);
            });

        }

        function readyCity(readyCity) {

            var Holders = null;

            Holders = {
                clockHolder: $(readyCity.$el).children('.clock'),
                alarmHolder: $(readyCity.$el).children('.alarm')
            };

            new ClockView({el: Holders.clockHolder, model: readyCity.model});

            new AlarmView({el: Holders.alarmHolder})

        }

        /**
         * Work with local Storate
         * */


        /*
         * Get cites from local Storage
         */
        LocalRender();

         /*
         *Save city to LacalStorage
         */


        Observer.on('saveLocalSt',saveLocalStorage);

        /*
         * Remove alarm from localStorage
         * */
        Observer.on('removeLocalAlarm',removeLocalAlarm);


        function LocalRender() {

            var localStorage = LocalStorage.getItems();

            for (var item in localStorage) {

                var self = this;
                if (item.indexOf('Alarm_') == -1) {

                 var  itemVal,
                      BacbondeModel,
                      model;

                    itemVal = localStorage[item];
                    BacbondeModel = Backbone.Model.extend({});

                    model = new BacbondeModel({
                        'city'   : JSON.parse(itemVal).city,
                        'country': JSON.parse(itemVal).country,
                        'offset' : JSON.parse(itemVal).offset
                    });
                 citesView.collection.add(model)
                }
            }
        }


        function saveLocalStorage(data){

            if(Modernizr.localstorage){
                LocalStorage

            }
        }

        function removeLocalAlarm (model){
            var jsonModel = null,
                firstAlarmKey,
                secondAlarmKey,
                mianAlarmkey;

            jsonModel      = model.toJSON();
            firstAlarmKey  = Constans.alarmKey;
            secondAlarmKey = jsonModel.city;
            mianAlarmkey   = firstAlarmKey + secondAlarmKey;

            console.log(mianAlarmkey);
            LocalStorage.removeItem(mianAlarmkey)
        };


        /////////////////
        Observer.on('readyClock',readyClock);
        function readyClock(clock){

        }

        Observer.on('readyAlarm',readyAlarm);

        function readyAlarm(alarm){
            console.log(alarm)
        }
    });