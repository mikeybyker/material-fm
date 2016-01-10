'use strict';

angular.module('sw.materialfm')
    .controller('NavigationController', function ($routeParams, $log, $location, LastFM, Utilities, $mdSidenav) {

        var self = this;
        this.master = {artist: 'The Cure'};
        this.potentials = [];

        this.searchArtists = function(user){
            this.master = angular.copy(user);
            if(!this.master.artist){
                return;
            }
            LastFM.searchArtists(this.master.artist)
                .then(function(response) {
                    // $log.info('searchArtists > response ::: ', response);
                    self.potentials = response.results.artistmatches.artist; // $resource
                }, function(reason) {
                    $log.info('Error ::: ', reason);
                    Utilities.showAlert('Bit of a problem loading data...Sorry.');
                });
        }

        this.reset = function() {
            this.user = angular.copy(this.master);
        };

        this.selectArtist = function(artist) {
            // $log.info('selectArtist ', artist);
            // $log.info('artist mbid ', artist.mbid);
            $mdSidenav('left').close()
                .then(function () {
                    $location.path('/artist/' + artist.name);
                });            
        };

        this.getImage = function(artist, size){
            return Utilities.getImage(artist, size);
        }
        this.close = function () {
            $mdSidenav('left').close()
                .then(function () {
                    // $log.info('close LEFT is done');
                });
        };
        this.toggleSidenav = function(){
            $mdSidenav('left').toggle();
        }

        this.reset();

    });