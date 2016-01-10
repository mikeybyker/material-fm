'use strict';

/**
 *
 * Add your Last.fm API key in CONSTANTS > bottom of the file!
 */
angular
    .module('materialFmApp', [
        'ngAnimate',
        'ngAria',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngMaterial',
        'sw.materialfm',
        'sw.common'
    ])
    .config(function ($routeProvider, $mdThemingProvider, $mdIconProvider) {

        $mdIconProvider
            .defaultIconSet("css/svg/avatars.svg", 128)
            .icon("menu"       , "css/svg/menu.svg"        , 24)
            .icon("close"       , "css/svg/close_white.svg", 24)
            .icon("share"      , "css/svg/share.svg"       , 24)
            .icon("google_plus", "css/svg/google_plus.svg" , 512)
            .icon("hangouts"   , "css/svg/hangouts.svg"    , 512)
            .icon("twitter"    , "css/svg/twitter.svg"     , 512)
            .icon("phone"      , "css/svg/phone.svg"       , 512)

            .icon('share-arrow', 'css/svg/share-arrow.svg', 24)
            .icon('upload', 'css/svg/upload.svg', 24)
            .icon('copy', 'css/svg/copy.svg', 24)
            .icon('print', 'css/svg/print.svg', 24)
            .icon('hangout2', 'css/svg/hangout.svg', 24)
            .icon('mail', 'css/svg/mail.svg', 24)
            .icon('message', 'css/svg/message.svg', 24)
            .icon('copy2', 'css/svg/copy2.svg', 24)
            .icon('facebook', 'css/svg/facebook.svg', 24)
            .icon('twitter2', 'css/svg/twitter.svg', 24);

        $mdThemingProvider.theme('default')
            .primaryPalette('purple')
            .accentPalette('grey')
            .warnPalette('red');

        $routeProvider
            .when('/menu', {
                templateUrl: 'views/menu.html'
            })
            .when('/artist/:artistname', {
                templateUrl: 'views/artist.html',
                controller: 'ArtistController',
                controllerAs: 'ac'
            })
            .when('/artist/:artistname/album/:albummbid', {
                templateUrl: 'views/album.html',
                controller: 'AlbumController',
                controllerAs: 'ac'
            })
            .otherwise({
                redirectTo: '/menu'
            });
    })

    .constant('CONSTANTS',
        {
        server:{
            host: 'http://ws.audioscrobbler.com/2.0/'
        },
        lastfm:{
            format: 'json',
            api_key: 'YOUR_API_KEY'
        }
    });