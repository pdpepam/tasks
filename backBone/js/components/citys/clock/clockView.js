define(['Vendor',
       'observer',
        'utils/dateConvertor',
        './clockModel',
        'text!./сlockTemplate.html'
], function (Vendor,
             Observer,
             DateConvertor,
             ItemModel,
             Template) {

    "use strict";

    var _ = Vendor._,
        $ = Vendor.$,
        clockView;

    clockView = Backbone.View.extend({

        initialize: function () {
            var self = this;
            setInterval(function(){self.render()},1000);
            this.render();
            Observer.trigger('readyClock',this.model.toJSON())
        },

        render: function () {
            var  json = null,
                newModel;

                 json = this.model.toJSON();

                newModel = new ItemModel({'hours'    : DateConvertor.getHours(json.offset),
                                          'minutes'  : DateConvertor.getMinutes(json.offset),
                                          'seconds'  : DateConvertor.getSeconds(json.offset)});

                this.template = _.template(Template);
                this.view = this.template(newModel.toJSON());
                this.$el.html(this.view);

                return this.$el;
        },

        localRender:function(){

        }
    });

    return clockView;
});
