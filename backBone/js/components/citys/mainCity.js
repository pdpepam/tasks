define([ 'CitysMain',
        'Vendor',
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

    function (CitesMain,
              Vendor,
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

        console.log('it work')
        var Holders = null,
            searchView = null,
            dropListView = null,
            citesView = null,

        Holders = {
            'searchHolder': '.google-search',
            'dropListHolder': '.auto-cites',
            'citysHolder': '.finded-cites tbody'
        };


        /**
         * Adding information to Views, thats cituated in folder CITY
         * */
        Observer.on('readyCity', readyCity);

       
        /*
        * On remove city
        * */
        Observer.on('removeCity',removeCity)

        function readyCity(readyCity) {

            var Holders = null;

            Holders = {
                clockHolder: $(readyCity.$el).children('.clock'),
                alarmHolder: $(readyCity.$el).children('.alarm')
            };

            new ClockView({el: Holders.clockHolder, model: readyCity.model});

            new AlarmView({el: Holders.alarmHolder})

            /*Save city in local Storage*/
            localSaveCity(readyCity);
            localSaveClock(readyCity);
            localSaveAlarm(readyCity);
        }

            function localSaveCity(city) {
                var json = null,
                    key = null,
                    filteredObj;

                json = city.model.toJSON();
                key = Constans.cityKey + city.cid;
                filteredObj = {
                    city: json.city,
                    country: json.country
                };
                LocalStorage.addItem(key, filteredObj)
            };

            function localSaveClock(city) {
                var json = null,
                    key = null,
                    filteredObj;

                json = city.model.toJSON();
                key = Constans.clockKey + city.cid;

                filteredObj = {
                    offset: json.offset
                };
                LocalStorage.addItem(key, filteredObj)
            };

            function localSaveAlarm(city) {
            var key = null,
                alarmValue;

            key = Constans.alarmKey + city.cid;

            alarmValue = {
                hours: '',
                minutes: ''
            };
            LocalStorage.addItem(key, alarmValue)
        };


        ///////////
        function removeCity(removeCity){
           //Define key in which will be deleted elements from localStorage
            var deletedKey = removeCity.cid;
           var localStorage = LocalStorage.getItems();
           for(var key in localStorage){
               if(key.indexOf(removeCity)){
                   LocalStorage.removeItem(key)
               }
           }
        }
 });