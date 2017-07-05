angular.module('myApp', ['ngRoute', 'ngAnimate'])
.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
  $locationProvider.html5Mode(true);
  $routeProvider.
    when('/login', {
      templateUrl: 'templates/login.html',
      controller: 'login'
    }).
    when('/issues', {
      templateUrl: 'templates/issues.html',
      controller: 'issues',
      controllerAs: 'issues'
    }).
    when('/issues/:issueId', {
      templateUrl: 'templates/issue.html',
      controller: 'issue',
      controllerAs: 'issue'
    }).
    otherwise('/login');
}])
.controller('login', ['$scope', '$filter', '$location', function($scope, $filter, $location) {
  $scope.login = function () {
    $location.path('/issues');
  };
}])
.controller('issues', ['$http', function ($http) {
  vm = this;
  vm.issuesUrl = 'https://api.github.com/repos/seasons521/mynote/issues?per_page=5';
  vm.pages = [1, 2, 3, 4, 5, 6];
  vm.getList = function (page) {
    if (page < vm.pages[0]) {
      page = vm.pages[0];
    };

    if (page > vm.pages[vm.pages.length -1]) {
      page = vm.page[vm.pages.length -1];
    };
    vm.currentPage = page;
    $http.get(vm.issuesUrl + '&page=' + page)
      .then(function (response) {
        console.log(response);
        vm.issues = response.data;
        console.log(vm.issues);
      }, function (response) {
        console.log(response);
      });
  };

  vm.getList(1);
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
}])
.directive('myNav', function () {
  return {
    restrict: 'AE',
    replace: true,
    templateUrl: 'templates/nav.html',
    scope: {
      curTab: '@curTab'
    }
  };
});

// The following will work if you have index.js loaded at the end of the page
// angular.bootstrap(document, ['myApp']);

// $(callback) behave just like $(document).ready(callback)
angular.element(function () {
  angular.bootstrap(document, ['myApp']);
});
