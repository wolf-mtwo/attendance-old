'use strict';

angular.module('mean.groups').factory('Estudiantes', ['$resource',
    function($resource) {
        return $resource('estudiante/:estudianteId', {
			estudianteId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
    }
]);
