define(['Vendor',
    'observer',
    '../../services/LocalStorage',
    'utils/dateConvertor',
    './cityModel',
    'text!./cityTemplate.html'
], function (Vendor,
             Observer,
             LocalStorage,
             DateConvertor,
             ItemModel,
             Template) {

    var _ = Vendor._,
        $ = Vendor.$,
        cityView;

    cityView = Backbone.View.extend({

        tagName: 'tr',

        events: {
            'click .delete-row': 'destroy'
        },

        initialize: function () {
            this.listenTo(this.model, 'destroy', this.remove);
            this.render();
        },

        render: function () {
            this.newModel = this.modelCalculation();
            this.template = _.template(Template);
            this.view = this.template(this.newModel.toJSON());
            this.$el.html(this.view);
            Observer.trigger('readyCity',this)
            return this.$el;
        },

        modelCalculation: function () {
            var json = null,
                newModel;

            json = this.model.toJSON();

            newModel = new ItemModel({
                    'city'    : json.city,
                    'country' : json.country,
                    'hours'   : 0,
                    'minutes' : 0
                }
            );

            return newModel;
        },

        destroy: function () {
            this.model.destroy();
        },

        remove: function () {
            this.$el.remove();
            Observer.trigger('removeCity', this)
        }


    });

    return cityView;
});
