define(['Vendor',
    'observer',
    'text!./dropListTemplate.html'], function (Vendor,
                                               Observer,
                                               Template) {


    Backbone = Vendor.Backbone,
           _ = Vendor._;


    var DropListView = Backbone.View.extend({

        tagName: 'div',

        className: 'row',

        events: {
            'click .selected-city': 'remove'
        },

        initialize: function () {
            this.render();
        },

        render: function () {
            this.template = _.template(Template);
            this.view = this.template(this.model.toJSON());
            this.$el.html(this.view);
            return this.$el;
        },

        remove: function () {
            Observer.trigger("selectGoogle", this.model);
            var json=this.model.toJSON();
            this.$el.remove();
        }
    });

return DropListView;
});
