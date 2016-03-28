/**
 * App
 */
(function() {

    /**
     * @name config
     * @desc Configures client-side routes.
     */
    function config($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'partial/main'
            })
            .when('/assignment/:id', {
                templateUrl: 'partial/assignment',
                controller: 'SubmissionController'
            }).otherwise({
                redirectTo: '/'
            });
    }
    angular
        .module('edmodo', ['ngRoute', 'ui.materialize', 'ngAnimate', 'ngCookies'])
        .config(config);

})();
