define(['Vendor',
        'utils/dateConvertor',
        'components/services/Forecast',
        './itemView',
        './itemModel',
        './citysCollection'

], function (Vendor,
             DateConvertor,
             Forecast,
             ItemView,
             ItemModel,
             Collection ) {

var _ = Vendor._,
    $ = Vendor.$,
    cityView = Backbone.View.extend({

    initialize: function () {
        var self = this;
        this.collection=new Collection();
        this.listenTo(this.collection,'add',this.render);
        this.clearInterval()
        this.interval=setInterval(function(){self.render()},1000);
        this.render();
    },

    render: function () {
        var self = this;
        this.$el.empty();
        this.collection.each(function(model){
            var  json = null,
                 itemView = null,
                 BackboneModel,
                 newModel;

            json = model.toJSON();

            BackboneModel = Backbone.Model.extend({});
            newModel = new BackboneModel({ 'city'     : json.city,
                                           'country'  : json.country,
                                           'hours'    : DateConvertor.getHours(json.offset),
                                           'minutes'  : DateConvertor.getMinutes(json.offset),
                                           'seconds'  : DateConvertor.getSeconds(json.offset)});

            itemView = new ItemView({model: newModel});

            self.$el.append(itemView.render());
        })

    },

    clearInterval:function(){
        clearInterval(this.interval)
    }
    });

return cityView;
});
