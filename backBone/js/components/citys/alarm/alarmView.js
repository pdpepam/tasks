define(['Vendor',
    'observer',
    '../../services/LocalStorage',
    'utils/dateConvertor',
    './alarmModel',
    'text!./alarmTemplate.html'
], function (Vendor,
             Observer,
             LocalStorage,
             DateConvertor,
             ItemModel,
             Template) {

    "use strict";

    var _ = Vendor._,
        $ = Vendor.$,
        clockView;

    clockView = Backbone.View.extend({

        events:{
            'blur .hours '  : 'saveHours',
            'blur .minutes' : 'saveMinutes'
        },

        model:new ItemModel({}),


        initialize: function () {
            var self = this;
            this.render();
        },

        render: function () {
            this.template = _.template(Template);
            this.view = this.template(this.model.toJSON());
            this.$el.html(this.view);
            return this.$el;
        },

        saveHours:function(){
            var val = this.$('.hours').val();
            this.model.set({
                'hours':val
            },{validate:true})
        },

        saveMinutes:function(){
            var val = this.$('.minutes').val();
            this.model.set({
                'hours':val
            },{validate:true})
        }}
    );

    return clockView;
});
