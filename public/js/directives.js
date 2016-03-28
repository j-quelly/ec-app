/**
 * App Directives
 */
(function() {

    /**
     * @name sidebar
     * @desc Custom directive attribute for the primary navigation.
     */
    function sidebar() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
                $('.button-collapse').sideNav({
                    menuWidth: 240,
                    edge: 'left',
                    closeOnClick: (width <= 992 ? true : false)
                });
            }
        };
    }
    angular
        .module('edmodo')
        .directive('tdSidebar', sidebar);


    /**
     * @name edToasts
     * @desc Custom directive to display toasts with a friendly error mesasge
     */
    function edToasts() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                scope.$watch('error', function() {
                    if (scope.error) {
                        Materialize.toast(scope.errorMessage, 5000, 'error');
                    }
                });
                scope.$watch('success', function() {
                    if (scope.success) {
                        Materialize.toast(scope.successMessage, 5000, 'success');
                    }
                });
            }
        };
    }
    angular
        .module('edmodo')
        .directive('edToasts', edToasts);

})();
