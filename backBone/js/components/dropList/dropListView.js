define(['Vendor',
       'observer',
       'text!./dropListTemplate.html',
       './itemView',
       './dropListCollection'], function (Vendor,
                                          Observer,
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

           this.$el.empty();
           this.collection.each(function(model){

               this.itemView=new ItemView({model:model});

               this.$el.append(this.itemView.render())

           },this);
        }
    });

return DropListView;

});
