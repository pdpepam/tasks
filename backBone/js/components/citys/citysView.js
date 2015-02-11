define(['Vendor',
        'utils/dateConvertor',
        'components/services/Forecast',
        './cityView',
        './citysCollection'

], function (Vendor,
             DateConvertor,
             Forecast,
             ItemView,
             Collection ) {

var _ = Vendor._,
    $ = Vendor.$,
    cityView = Backbone.View.extend({

        initialize: function () {
            var self = this;
            this.collection=new Collection();
            this.listenTo(this.collection,'add',this.render);
            setInterval(function(){self.render()},1000);
            this.render();
        },

        render: function () {
            var self = this;
            this.$el.empty();
            this.collection.each(function(model){
                var itemView = null;

                itemView = new ItemView({model: model});
                self.$el.append(itemView.render());
            });
        }
    });

return cityView;
});
