// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic', 'ngCordova']);

app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
});

app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'view/home.html',
            controller: 'MapController'
        })
        $urlRouterProvider.otherwise('/home');
});

app.controller('MapController', function($scope, $cordovaGeolocation, $ionicLoading, $ionicPlatform) {


    $ionicPlatform.ready(function() {


        // var x = document.getElementById("demo");

        // $scope.getLocation = function() {
        //     if (navigator.geolocation) {
        //         console.log('1');
        //         navigator.geolocation.getCurrentPosition(showPosition);
        //     } else {
        //         console.log('2');
        //         x.innerHTML = "Geolocation is not supported by this browser.";
        //     }
        //     console.log('3');
        // }

        // function showPosition(position) {
        //     console.log('4');
        //     x.innerHTML = "Latitude: " + position.coords.latitude +
        //         "<br>Longitude: " + position.coords.longitude;
        //         console.log(position.coords.latitude);
        // }


        // var posOptions = { timeout: 10000, enableHighAccuracy: true };
        // $cordovaGeolocation
        //     .getCurrentPosition(posOptions)
        //     .then(function(position) {
        //         lat = position.coords.latitude;
        //         long = position.coords.longitude;
        //     console.log("Here we go");
        //         console.log(lat, long);


        //     }, function(err) {
        //         // error
        //     });


        // var watchOptions = {
        //     timeout: 3000,
        //     enableHighAccuracy: true // may cause errors if true
        // };







        $ionicLoading.show({
            template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location!'
        });

        var posOptions = {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 0
        };
        $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {

            $scope.lat  = position.coords.latitude;
            $scope.long = position.coords.longitude;


            var lat  = position.coords.latitude;
            var long = position.coords.longitude;
            console.log(lat,long)

            var myLatlng = new google.maps.LatLng(lat, long);

            var mapOptions = {
                center: myLatlng,
                zoom: 24,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            var map = new google.maps.Map(document.getElementById("map"), mapOptions);

            $scope.map = map;
            $ionicLoading.hide();

        }, function(err) {
            $ionicLoading.hide();
            console.log(err);
        });
    });
});
