/**
 * Assignment Factory
 * @namespace Factories
 */
(function() {

    /**
     * @namespace AssignmentService 
     * @desc Interfaces with edmodo API to get assignment data.
     * @memberOf Factories
     */
    function AssignmentService($q, $http, $cookies) {
        var AssignmentService = {}
        var cookie = $cookies.get('localStorage');
        var assignments = (cookie ? JSON.parse(cookie) : []);

        /**
         * @name createAssignment
         * @desc Creates a new assignment and stores it in a cookie.
                 Then retrieves all assignments from the Edmodo API.
         * @returns {array}
         * @memberOf Factories.AssignmentService
         */
        AssignmentService.createAssignment = function(input) {
            var deferred = $q.defer();
            assignments.push(input);

            // store the assignment in a cookie
            $cookies.put('localStorage', JSON.stringify(assignments));

            $http.get('https://api.edmodo.com/assignments?access_token=12e7eaf1625004b7341b6d681fa3a7c1c551b5300cf7f7f3a02010e99c84695d')
                .success(function(data, status) {
                    deferred.resolve(data.concat(assignments));
                })
                .error(function(data) {
                    deferred.reject();
                });
            return deferred.promise;
        }

        /**
         * @name getAssignments
         * @desc Retrieves all assignments from Edmodo API to get assignment data.
         * @returns {array}
         * @memberOf Factories.AssignmentService
         */
        AssignmentService.getAssignments = function() {
            var deferred = $q.defer();
            $http.get('https://api.edmodo.com/assignments?access_token=12e7eaf1625004b7341b6d681fa3a7c1c551b5300cf7f7f3a02010e99c84695d')
                .success(function(data, status) {
                    deferred.resolve(data.concat(assignments));
                })
                .error(function(data) {
                    deferred.reject();
                });
            return deferred.promise;
        }

        /**
         * @name getAssignment
         * @desc Retrieves a single assignment from Edmodo API.
         * @param {string} id - Unique identifier for the assignment.
         * @returns {object}
         * @memberOf Factories.AssignmentService
         */
        AssignmentService.getAssignment = function(id) {
            var deferred = $q.defer();
            var obj = assignments.filter(function(obj) {
                return obj.id == id;
            })[0];
            if (obj !== undefined) {
                deferred.resolve(obj);
            } else {
                $http.get('https://api.edmodo.com/assignments/' + id + '/?access_token=12e7eaf1625004b7341b6d681fa3a7c1c551b5300cf7f7f3a02010e99c84695d')
                    .success(function(data, status) {
                        deferred.resolve(data);
                    })
                    .error(function(data) {
                        deferred.reject();
                    });
            }
            return deferred.promise;
        }

        return AssignmentService;

    }
    angular
        .module('edmodo')
        .factory('AssignmentService', AssignmentService);

})();


/**
 * Submission Factory
 * @namespace Factories
 */
(function() {

    /**
     * @namespace SubmissionService
     * @desc Interfaces with edmodo API to get submission data.
     * @memberOf Factories
     */
    function SubmissionService($q, $http) {
        var SubmissionService = {};

        /**
         * @name getSubmissions
         * @desc Retrieves all submissions from Edmodo API.
         * @returns {object}
         * @memberOf Factories.SubmissionService
         */
        SubmissionService.getSubmissions = function(id) {
            var deferred = $q.defer();
            $http.get('https://api.edmodo.com/assignment_submissions?assignment_id=' + id + '&assignment_creator_id=73240721&access_token=12e7eaf1625004b7341b6d681fa3a7c1c551b5300cf7f7f3a02010e99c84695d')
                .success(function(data, status) {
                    deferred.resolve(data);
                })
                .error(function(data) {
                    deferred.reject();
                });
            return deferred.promise;
        }

        return SubmissionService;

    }
    angular
        .module('edmodo')
        .factory('SubmissionService', SubmissionService);


})();
