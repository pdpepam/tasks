define(['Vendor',
        'observer',
        'utils/dateConvertor',
        './cityModel',
        'text!./cityTemplate.html'
], function (Vendor,
             Observer,
             DateConvertor,
             ItemModel,
             Template) {

    var _ = Vendor._,
        $ = Vendor.$,
        cityView;

    cityView = Backbone.View.extend({
        tagName: 'tr',

        events: {
            'click .delete-row': 'remove'
        },

        initialize: function () {
            this.render();
        },

        render: function () {
            var  json = null,
                 newModel;

            json = this.model.toJSON();

            newModel = new ItemModel({ 'city'     : json.city,
                                       'country'  : json.country,
                                       'hours'    : DateConvertor.getHours(json.offset),
                                       'minutes'  : DateConvertor.getMinutes(json.offset),
                                       'seconds'  : DateConvertor.getSeconds(json.offset)});

            this.template = _.template(Template);
            this.view = this.template(newModel.toJSON());
            this.$el.html(this.view);
            return this.$el;
        },

        remove: function () {
            Observer.trigger('remove', this);
        }

    });

    return cityView;
});
