define('Vendor', [
    'vendor/core'
], function (core) {

    'use strict';

    return {
        '$'        : core.$,
        '_'        : core._,
        'Backbone' : core.Backbone
    };
});