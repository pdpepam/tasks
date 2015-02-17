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

            /**
            * Save to LocaslStorage*/
            this.saveLocalHours(val)
        },

        saveMinutes:function(){
            var val = this.$('.minutes').val();
            this.model.set({
                'hours':val
            },{validate:true})
           /**
            * Save local minutes*/
            this.saveLocalMinutes(val)
        },

        _AlarmKey: function(){
            return 'Alarm_'+this.$('.hours').parent().siblings('.city').html()
        },


         saveLocalHours:function(val){
             var alarmkey = this._AlarmKey();
             var obj={
                 'hours'   : val,
                 'minutes' : '00'
             };
             LocalStorage.addItem(alarmkey,obj)
         },

        saveLocalMinutes:function(val){
            var alarmkey = this._AlarmKey();
            var curVal = JSON.parse(localStorage.getItem(alarmkey));
            console.log(curVal,'curval')
            if(curVal){
                var newObj={
                    hours   :curVal.hours,
                    minutes :val
                };
                var stringify=JSON.stringify(newObj)
                LocalStorage.setItem(alarmkey,stringify )
            }
        }
    }

);

    return clockView;
});
