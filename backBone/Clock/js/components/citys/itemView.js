define(['Vendor',
    'observer',
    'text!./itemTemplate.html'
], function (Vendor, Observer, Template) {

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
            var json = this.model.toJSON();
            this.template = _.template(Template);
            this.view = this.template(json);
            this.$el.html(this.view);
            return this.$el;
        },

        remove: function () {
            Observer.trigger('remove', this);
            this.$el.remove();
        }

    });

    return cityView;
});
