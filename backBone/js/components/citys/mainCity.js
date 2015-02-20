define(['Vendor',
        'observer',
        'constans',
        'components/services/LocalStorage',
        'components/citys/citysView',
        'components/citys/clock/clockView',
        'components/citys/alarm/alarmView'
    ],

    function (Vendor,
              Observer,
              Constans,
              LocalStorage,
              CitesView,
              ClockView,
              AlarmView  ) {

        'use strict';
        var Holders = null,
            searchView = null,
            dropListView = null,
            citesView = null,

        Holders = {
            'searchHolder'  : '.google-search',
            'dropListHolder': '.auto-cites',
            'citysHolder'   : '.finded-cites tbody'
        };


         Observer.on('readyCity', readyCity);


        /*
        * Sacing changes of alarm*/
         Observer.on('readyAlarm', readyAlarm);

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
            //localSaveAlarm(readyCity);
        }

            function _secondKey(city){
                var json = null,
                    key = null;

                    json = city.model.toJSON();

                    key = json.city +json.country;
                    return key
            }

            function localSaveCity(city) {
                var json = null,
                    key = null,
                    filteredObj;

                json = city.model.toJSON();

                var firsKey= Constans.cityKey
                var secondKey = _secondKey(city)
                key = firsKey +secondKey;

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
                var firstKey=Constans.clockKey;
                var secondKey =_secondKey(city);

                key = firstKey+secondKey;

                filteredObj = {
                    offset: json.offset
                };
                LocalStorage.addItem(key, filteredObj)
            };

            function localSaveAlarm(city) {
            var key = null,
                alarmValue;

            var firstKey=Constans.alarmKey;
            var secondKey =_secondKey(city);

                key = firstKey + secondKey;

            alarmValue = {
                hours: '',
                minutes: ''
            };
            LocalStorage.addItem(key, alarmValue)
        };


        ///////////
        function removeCity(removeCity){
           //Define key in which will be deleted elements from localStorage
            var deletedKey = _secondKey(removeCity);

           var localStorage = LocalStorage.getItems();
           for(var key in localStorage){
               console.log(key)
               if(key.indexOf(deletedKey)!=-1){
                   LocalStorage.removeItem(key)
               }
           }
        }
        ////////////////////////////////////////////

        function readyAlarm(alarm){
            var json = alarm.model.toJSON();
            var city    = alarm.$el.closest('tr').children('.city').html().trim();
            var country = alarm.$el.closest('tr').children('.country').html().trim();
            var secondkey = city+country+'';
            var firstKey = Constans.alarmKey;
            var key = firstKey+secondkey;
            LocalStorage.addItem(key, json)
        }

 });