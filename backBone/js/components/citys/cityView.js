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
            'click .delete-row': 'destroy'
        },

        initialize: function () {
            this.listenTo(this.model, 'destroy', this.remove)
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

        destroy: function () {
            this.model.destroy();
            //Observer.trigger('remove', this);
        },

        remove: function(){
            this.$el.remove();
        }
    });

    return cityView;
});
