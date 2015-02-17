define(['Vendor',
        'Observer',
        '../services/LocalStorage',
        '../../utils/dateConvertor',
        'components/services/Forecast',
        './city/cityView',
        './clock/clockView',
        './alarm/alarmView',
        './citysCollection',
        'text!./citesTemplate.html'

], function (Vendor,
             Observer,
             LocalStorage,
             DateConvertor,
             Forecast,
             CityView,
             ClockView,
             AlarmView,
             Collection,
             MainTemplate) {

var _ = Vendor._,
    $ = Vendor.$,
    Backbone = Vendor.Backbone,
    cityView = Backbone.View.extend({

        template: _.template(MainTemplate),

        initialize: function () {
            var self = this;
            this.collection=new Collection();
            this.listenTo(this.collection,'add',this.render);
            this.localStorageRender();
            this.render();
        },

        render: function () {
            var self = this;
            this.$el.empty();
            this.mainView = this.template;
            //this.$el.append("aaaaaaa");
            this.collection.each(function(model){
                var cityView = null,
                    clockView = null,
                    alaramView = null,
                    clockHolder = null;


                cityView = new CityView({model: model});

                setTimeout(function(){
                    var Holders={
                        clockHolder:$(cityView.$el).children('.clock'),
                        alarmHolder:$(cityView.$el).children('.alarm')
                    }
                    var holder = $(cityView.$el).children('.clock') ;
                    clockView = new ClockView({el:Holders.clockHolder, model:model});
                    alaramView=new AlarmView({el:Holders.alarmHolder})
                },1);

                self.$el.append(cityView.render());
            });
        },

        localStorageRender:function(){
            var self=this;
            var localStorage=LocalStorage.getItems();
            for(var item in localStorage){
                var json = localStorage[item];
                var some = json;
                var BacbondeModel=Backbone.Model.extend({})
                var model =new BacbondeModel({
                    'city':JSON.parse(some).city,
                    'country':JSON.parse(some).country,
                    'offset':JSON.parse(some).offset
                });
                self.collection.add(model)
            }
        }

    });

return cityView;
});
