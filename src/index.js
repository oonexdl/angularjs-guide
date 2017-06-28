angular.module('myApp', [])
.controller('websocket', ['$scope', '$filter', function($scope, $filter) {
  var socket = new WebSocket("ws://localhost:9999");
  socket.onopen = function (event) {
    console.log('web socket opened');
    socket.send("1");
  };

  socket.onmessage = function (event) {
    console.log(event.data);
  }

  $scope.sendMessage = function () {
    console.log('send message');
    socket.send($filter('currency')($scope.qty * $scope.cost));
  };
}]);

// The following will work if you have index.js loaded at the end of the page
// angular.bootstrap(document, ['myApp']);

// $(callback) behave just like $(document).ready(callback)
angular.element(function () {
  angular.bootstrap(document, ['myApp']);
});
