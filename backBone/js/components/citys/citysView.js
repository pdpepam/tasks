define(['Vendor',
        'Observer',
        '../services/LocalStorage/LocalStorage',
        '../../utils/dateConvertor',
        'components/services/Forecast',
        './city/cityView',
        './clock/clockView',
        './citysCollection'

], function (Vendor,
             Observer,
             LocalStorage,
             DateConvertor,
             Forecast,
             CityView,
             ClockView,
             Collection ) {

var _ = Vendor._,
    $ = Vendor.$,
    Backbone = Vendor.Backbone,
    cityView = Backbone.View.extend({

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
            this.collection.each(function(model){
                var cityView = null,
                    clockView = null,
                    clockHolder = null;


                cityView = new CityView({model: model});

                setTimeout(function(){
                    var holder = $(cityView.$el).children('.clock') ;
                    clockView = new ClockView({el:holder, model:model});
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
                console.log(JSON.parse(some));
                var BacbondeModel=Backbone.Model.extend({})
                var model =new BacbondeModel({
                    'city':JSON.parse(some).city,
                    'country':JSON.parse(some).country,
                    'offset':JSON.parse(some).offset
                });
                console.log(model)
                self.collection.add(model)
            }
          /*  if(Modernizr.localstorage){
                console.log(LocalStorage.getItems())

                //this.collection.each(function(model){
                //    var cityView = null,
                //        clockView = null,
                //        clockHolder = null,
                //
                //
                //        cityView = new CityView({model: model});
                //
                //    setTimeout(function(){
                //        var holder = $(cityView.$el).children('.clock') ;
                //        clockView = new ClockView({el:holder, model:model});
                //    },1);
                //
                //    self.$el.append(cityView.render());
                //

                //});

            }*/
        }

    });

return cityView;
});
