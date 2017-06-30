angular.module('myApp', ['ngRoute', 'ngAnimate'])
.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
  $locationProvider.html5Mode(true);
  $routeProvider.
    when('/login', {
      templateUrl: 'login.html',
      controller: 'login'
    }).
    when('/issues', {
      templateUrl: 'issues.html',
      controller: 'issues',
      controllerAs: 'issues'
    }).
    when('/issues/:issueId', {
      templateUrl: 'issue.html',
      controller: 'issue',
      controllerAs: 'issue'
    }).
    otherwise('/');
}])
.controller('login', ['$scope', '$filter', '$location', function($scope, $filter, $location) {
  $scope.login = function () {
    $location.path('/issues');
  };
}])
.controller('issues', ['$http', function ($http) {
  vm = this;
  $http.get('https://api.github.com/repos/seasons521/mynote/issues')
    .then(function (response) {
      vm.issues = response.data;
      console.log(vm.issues);
    }, function (response) {
      console.log(response);
    });
}])
.controller('issue', ['$routeParams', '$http', function ($routeParams, $http) {
  vm = this;
  vm.issueId = $routeParams.issueId;
  $http.get('https://api.github.com/repos/seasons521/mynote/issues/' + vm.issueId)
    .then(function (response) {
      vm.body = response.data.body;
    }, function (response) {
      console.log(response);
    });
}]);

// The following will work if you have index.js loaded at the end of the page
// angular.bootstrap(document, ['myApp']);

// $(callback) behave just like $(document).ready(callback)
angular.element(function () {
  angular.bootstrap(document, ['myApp']);
});
