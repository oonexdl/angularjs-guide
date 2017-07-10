angular.module 'myApp', ['ngRoute', 'ngAnimate']
.config [
  '$locationProvider'
  '$routeProvider'
  ($locationProvider, $routeProvider) ->
    $locationProvider.html5Mode(true)
    $routeProvider.
      when('/login', {
        templateUrl: '/dist/templates/login.html'
        controller: 'login'
      }).
      when('/issues', {
        templateUrl: '/dist/templates/issues.html'
        controller: 'issues'
        controllerAs: 'issues'
      }).
      when('/issues/:issueId', {
        templateUrl: '/dist/templates/issue.html'
        controller: 'issue'
        controllerAs: 'issue'
      }).
      otherwise('/login')
]
.controller 'login', [
  '$scope'
  '$filter'
  '$location'
  ($scope, $filter, $location) ->
    $scope.login = ->
      $location.path('/issues')
]
.controller 'issues', [
  '$http'
  ($http) ->
    vm = this
    vm.issuesUrl = 'https://api.github.com/repos/seasons521/mynote/issues?per_page=5'
    vm.pages = [1, 2, 3, 4, 5, 6]
    vm.getList = (page) ->
      page = vm.pages[0] if page < vm.pages[0]
      page = vm.page[vm.pages.length - 1] if page > vm.pages[vm.pages.length - 1]

      vm.currentPage = page
      $http.get vm.issuesUrl + '&page=' + page
      .then (response) ->
        vm.issues = response.data
        console.log response.data
      , (response) ->
        console.log response

    vm.getList 1
    vm
]
.controller 'issue', [
  '$routeParams'
  '$http'
  ($routeParams, $http) ->
    vm = this
    vm.issueId = $routeParams.issueId
    $http.get 'https://api.github.com/repos/seasons521/mynote/issues/' + vm.issueId
    .then (response) ->
      vm.body = response.data.body
    , (response) ->
      console.log response
]
.directive 'myNav', ->
  {
    restrict: 'AE'
    replace: true
    templateUrl: '/dist/templates/nav.html'
    scope:
      curTab: '@curTab'
  }

# The following will work if you have index.js loaded at the end of the page
# angular.bootstrap(document, ['myApp']);

# $(callback) behave just like $(document).ready(callback)
angular.element( ->
  angular.bootstrap document, ['myApp']
)
