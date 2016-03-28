/**
 * App Controllers
 */
(function() {

    /**
     * @name AssignmentController
     * @desc Controller for the list of assignments.
     */
    function AssignmentController($scope, AssignmentService, $location) {
        $scope.assignments = [];
        $scope.assignmentForm = {};
        $scope.today = new Date();

        /**
         * @name createAssignment
         * @desc Creates a new assignment.
         */
        $scope.createAssignment = function() {
            var input = {
                id: new Date().getTime().toString().substring(5, 13),
                title: $scope.assignmentForm.title,
                due_at: $scope.assignmentForm.due_at,
                description: $scope.assignmentForm.description
            };

            /**
             * @name createAssignment
             * @desc Creates a new assignment and stores it in a cookie.
                     Then retrieves all assignments from the Edmodo API.
             * @returns {array}
             * @memberOf Factories.AssignmentService
             */
            AssignmentService.createAssignment(input)
                .then(function(data) {
                    $scope.assignments = data;
                })
                .catch(function() {
                    $scope.error = true;
                    $scope.errorMessage = "Cannot create assignment, please try again.";
                });

            // clear the form
            $scope.assignmentForm.title = '';
            $scope.assignmentForm.due_at = '';
            $scope.assignmentForm.description = '';
        }

        /**
         * @name getAssignments
         * @desc Retrieves all assignments from Edmodo API to get assignment data.
         * @returns {array}
         * @memberOf Factories.AssignmentService
         */
        AssignmentService.getAssignments()
            .then(function(data) {
                $scope.assignments = data;
            })
            .catch(function() {
                $scope.error = true;
                $scope.errorMessage = "Cannot get assignments, please try again.";
            });

        /**
         * @name selectAssignment
         * @desc Changes the path of the application.
         * @param {string} path - path for URI
         */
        $scope.selectAssignment = function(path) {
            $location.path(path);
        }

        /**
         * @name activate
         * @desc Sets the selected element.
         * @param {object} item - The element object.
         */
        $scope.activate = function(item) {
            $scope.selected = item;
        };

        /**
         * @name isActive
         * @desc Checks if the item has been selected 
                 so that the active class can be added.
         * @param {object} item - The element object.
         */
        $scope.isActive = function(item) {
            return $scope.selected === item;
        };

        /**
         * @name getPathId
         * @desc Gets the unique identifer from the URI to mark an assignment as active
                 this is used for when the page is reloaded.
         * @returns {string} The ID of the selected assignment.
         */
        $scope.getPathId = function() {
            var id = $location.path().split("/")[2]
            return id;
        }

    }
    angular
        .module('edmodo')
        .controller('AssignmentController', AssignmentController);


    /**
     * @name SubmissionController
     * @desc Controller for the assignments and submissions.
     */
    function SubmissionController($scope, $routeParams, AssignmentService, SubmissionService) {
        $scope.assignment = {};
        $scope.submissions = [];
        $scope.loaded = false;
        $scope.showTabs = false;

        /**
         * @name getAssignment
         * @desc Retrieves a single assignment from Edmodo API.
         * @param {string} id - Unique identifier for the assignment.
         * @returns {object}
         * @memberOf Factories.AssignmentService
         */
        AssignmentService.getAssignment($routeParams.id)
            .then(function(data) {
                $scope.assignment = data;
            })
            .catch(function() {
                $scope.error = true;
                $scope.errorMessage = "Cannot get assignment, please try again.";
            });

        /**
         * @name getSubmissions
         * @desc Retrieves all submissions from Edmodo API.
         * @returns {object}
         * @memberOf Factories.SubmissionService
         */
        SubmissionService.getSubmissions($routeParams.id)
            .then(function(data) {
                $scope.submissions = data;
                $scope.loaded = true;
                $scope.showTabs = true;
                $scope.noSubmissions = (data.length > 0 ? false : 'Sorry, there are no submissions to display at this time.');
            })
            .catch(function() {
                $scope.error = true;
                $scope.errorMessage = "Cannot get submissions, please try again.";
            });

    }
    angular
        .module('edmodo')
        .controller('SubmissionController', SubmissionController);

})();
