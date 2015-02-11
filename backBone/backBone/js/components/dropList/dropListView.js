define(['Vendor',
       'observer',
       'components/services/Forecast',
       'text!./dropListTemplate.html',
       './itemView',
       './dropListCollection'], function (Vendor,
                                          Observer,
                                          Forecast,
                                          Template,
                                          ItemView,
                                          Collection) {

   var Backbone = Vendor.Backbone,
       _ = Vendor._,
       DropListView;

   DropListView = Backbone.View.extend({

        initialize: function () {
            this.collection=new Collection();
            this.listenTo(this.collection, "add", this.render);
            this.render();
        },

        render: function () {
           this.$el.empty()
           this.collection.each(function(model){

               this.itemView=new ItemView({model:model});

               $('.auto-cites').append(this.itemView.render())

           });
        }
    });

return DropListView;

});
