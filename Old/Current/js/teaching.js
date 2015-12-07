var myApp = angular.module('myApp', ['ui.router'])

// sets up the config states
.config(function($stateProvider) {
  
  $stateProvider  
    
    .state('home', {
      url:'',
      templateUrl: 'templates/home.html',
      controller: 'HomeController',
    })

    .state('lessonone', {
      url:'/lessonone',
      templateUrl: 'templates/lessonone.html',
      controller: 'L1Controller',
    })

    .state('lessontwo', {
      url:'/lessontwo',
      templateUrl: 'templates/lessontwo.html',
      controller: 'L2Controller',
    })

    .state('lessonthree', {
      url:'/lessonthree',
      templateUrl: 'templates/lessonthree.html',
      controller: 'L3Controller',
    })
})

