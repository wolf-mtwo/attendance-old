'use strict';

angular.module('mean.groups').factory('Institucion', ['$resource',
    function($resource) {
        return $resource('institucion/:institucionId', {
			institucionId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
    }
]);
