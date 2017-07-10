angular.module('myApp', ['ngRoute', 'ngAnimate']).config([
  '$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(true);
    return $routeProvider.when('/login', {
      templateUrl: '/dist/templates/login.html',
      controller: 'login'
    }).when('/issues', {
      templateUrl: '/dist/templates/issues.html',
      controller: 'issues',
      controllerAs: 'issues'
    }).when('/issues/:issueId', {
      templateUrl: '/dist/templates/issue.html',
      controller: 'issue',
      controllerAs: 'issue'
    }).otherwise('/login');
  }
]).controller('login', [
  '$scope', '$filter', '$location', function($scope, $filter, $location) {
    return $scope.login = function() {
      return $location.path('/issues');
    };
  }
]).controller('issues', [
  '$http', function($http) {
    var vm;
    vm = this;
    vm.issuesUrl = 'https://api.github.com/repos/seasons521/mynote/issues?per_page=5';
    vm.pages = [1, 2, 3, 4, 5, 6];
    vm.getList = function(page) {
      if (page < vm.pages[0]) {
        page = vm.pages[0];
      }
      if (page > vm.pages[vm.pages.length - 1]) {
        page = vm.page[vm.pages.length - 1];
      }
      vm.currentPage = page;
      return $http.get(vm.issuesUrl + '&page=' + page).then(function(response) {
        vm.issues = response.data;
        return console.log(response.data);
      }, function(response) {
        return console.log(response);
      });
    };
    vm.getList(1);
    return vm;
  }
]).controller('issue', [
  '$routeParams', '$http', function($routeParams, $http) {
    var vm;
    vm = this;
    vm.issueId = $routeParams.issueId;
    return $http.get('https://api.github.com/repos/seasons521/mynote/issues/' + vm.issueId).then(function(response) {
      return vm.body = response.data.body;
    }, function(response) {
      return console.log(response);
    });
  }
]).directive('myNav', function() {
  return {
    restrict: 'AE',
    replace: true,
    templateUrl: '/dist/templates/nav.html',
    scope: {
      curTab: '@curTab'
    }
  };
});

angular.element(function() {
  return angular.bootstrap(document, ['myApp']);
});
