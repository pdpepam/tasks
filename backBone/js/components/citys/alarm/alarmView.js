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

        model:new ItemModel({}),


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
            },{validate:true})
            Observer.trigger('readyAlarm',this).$el;
        },

        //saveMinutes:function(){
        //    var val = this.$('.minutes').val();
        //    this.model.set({
        //        'minutes':val
        //    },{validate:true})
        //   /**
        //    * Save local minutes*/
        //    this.saveLocalMinutes(val)
        //},

        _AlarmKey: function(){
            return 'Alarm_'+this.$('.hours').parent().siblings('.city').html()
        },


         saveLocalHours:function(val){
             var alarmkey = this._AlarmKey().trim();
             var json= alarmkey;
             var obj={
                 'hours'   : val,
                 'minutes' : '00'
             };
             LocalStorage.addItem(json,obj)
         },

        saveLocalMinutes:function(val){
            var alarmkey = this._AlarmKey();
            var curVal = JSON.parse(localStorage.getItem(alarmkey));
            if(curVal){
                var newObj={
                    hours   :curVal.hours,
                    minutes :val
                };
                var stringify=JSON.stringify(newObj);
                LocalStorage.setItem(alarmkey,stringify )
            }
        }
    }

);

    return clockView;
});
