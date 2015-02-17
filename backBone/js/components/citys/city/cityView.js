define(['Vendor',
        'observer',
        'components/services/LocalStorage/LocalStorage',
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
            this.saveLocal();
            this.render();
        },

        render: function () {
            this.newModel=this.modelCalculation();
            this.template = _.template(Template);
            this.view = this.template(this.newModel.toJSON());
            this.$el.html(this.view);
            return this.$el;
        },

        modelCalculation: function(){
            var  json = null,
                newModel;

            json = this.model.toJSON();

            newModel = new ItemModel({ 'city'     : json.city,
                                        'country'  : json.country}
                //'hours'    : DateConvertor.getHours(json.offset),
                //'minutes'  : DateConvertor.getMinutes(json.offset),
                //'seconds'  : DateConvertor.getSeconds(json.offset)}
            );


        return newModel;
        },



        destroy: function () {
            this.model.destroy();
        },

        remove: function(){
            this.$el.remove();
        },


        saveLocal:function(){
            var json =this.model.toJSON();
            LocalStorage.addItem(json.city,json)
            //console.log(localStorage);
        }
    });

    return cityView;
});
