define('vendor/core',
    ['jquery',
     'lodash',
     'Backbone'],function(
                          $,
                          _,
                          Backbone,
                          Router){

 return{
   '$':$,
   '_':_,
   'Backbone':Backbone
}
});