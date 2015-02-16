define(['Vendor',
        'Observer',
        'components/services/LocalStorage',
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
                    clockHolder = null,


                cityView = new CityView({model: model});

                setTimeout(function(){
                    var holder = $(cityView.$el).children('.clock') ;
                    clockView = new ClockView({el:holder, model:model});
                },1);

                self.$el.append(cityView.render());


            });
        },

        localStorageRender:function(){

            console.log(LocalStorage)
            if(Modernizr.localstorage){

                LocalStorage.each(function(model){

                })
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

            }
        }

    });

return cityView;
});
