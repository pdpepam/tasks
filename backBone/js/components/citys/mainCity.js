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

            new AlarmView({el: Holders.alarmHolder ,  model: readyCity.model})

            /*Save city in local Storage*/
            localSaveCity(readyCity);
            localSaveClock(readyCity);
            localSaveAlarm(readyCity);
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

            function  localSaveAlarm(city) {
            var key = null,
                alarmValue;

            var firstKey=Constans.alarmKey;
            var secondKey = _secondKey(city);

                key = firstKey + secondKey;

            alarmValue = {
                hours: 0,
                minutes: 0
            };
            LocalStorage.addItem(key, alarmValue)
        };


        ///////////
        function removeCity(removeCity){
           //Define key in which will be deleted elements from localStorage
            var deletedKey = _secondKey(removeCity);

           var localStorage = LocalStorage.getItems();
           for(var key in localStorage){
               if(key.indexOf(deletedKey)!=-1){
                   LocalStorage.removeItem(key)
               }
           }
        }


        function readyAlarm(alarm){
            var json = alarm.model.toJSON();
            var c = alarm.$el;
            var co =alarm.$el
            var city    = $(c).closest('tr').children('.city').html();
            var country = $(co).closest('tr').children('.country').html();

            var notspageCity = city.trim();
            var notspageCountry = city.trim();
            var secondkey = notspageCity + notspageCountry;
            var firstKey = Constans.alarmKey;
            var key = firstKey+secondkey;
            var obj={
                'hours'   : json.hours,
                'minutes' : json.minutes
            }
            LocalStorage.setItem(key, JSON.stringify(json))
        }




        Observer.on('tiktak',tiktak);

        function tiktak(time){
            ////define alarm for this clock
            var alarm = $(time).closest('tr').children('.alarm');
            //
            var hours  = $(alarm).children('.hours').val()
            var minutes = $(alarm).children('.minutes').val()

            var alarmTime = hours + minutes;
            var clockTime = time.html()
            //deleteseconds
            var removeSec = clockTime.split(':');
            var result = removeSec[0]+removeSec[1]


        }

 });