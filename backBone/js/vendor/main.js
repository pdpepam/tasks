define('Vendor', [
    'vendor/core',
    'observer'
], function (core, router) {

    'use strict';

    return {
        '$': core.$,
        '_': core._,
        'Backbone': core.Backbone
    };
});