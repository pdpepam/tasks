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
                this.collection = new Collection();
                this.listenTo(this.collection, 'add', this.render);

                this.render();
            },

            render: function () {
                var self = this;
                this.$el.empty();
                this.collection.each(function (model) {
                    var cityView = null,
                    cityView = new CityView({model: model});
                    self.$el.append(cityView.render());
                });
            }

        });

    return cityView;
});
