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
            'blur .hours '  : 'saveChanges',
            'blur .minutes' : 'saveChanges'
        },

        model: new ItemModel({}),


        initialize: function () {
            var self = this;
            this.listenTo(this.model,'change',this.render)
            this.render();
        },

        render: function () {
            this.template = _.template(Template);
            this.view = this.template(this.model.toJSON());
            this.$el.html(this.view);

            return this.$el;
        },

        saveChanges:function(){
            var hours   = this.$('.hours').val();
            var minutes = this.$('.minutes').val();
            this.model.set({
                'hours'  : hours,
                'minutes': minutes
            },{validate:true});
            Observer.trigger('readyAlarm',this);

        }

    }

);

    return clockView;
});
