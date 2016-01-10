'use strict';

angular.module('sw.materialfm')
    .controller('ArtistController', function ($routeParams, $log, $location, LastFM, Utilities) {

        this.artistname = $routeParams.artistname;
        this.artist = {};
        this.albums = [];
        this.links = [];
        this.mainimage = '';

        if(this.artistname){
            this.links = ([{title:this.artistname, url:'/artist/'+this.artistname}]);
            var self = this;
            LastFM.getAllArtist(this.artistname, {}, {limit: 6})
                .then(function(response) {
                    // $log.info('getAllArtist > response ::: ', response);
                    self.artist = response[0].artist;
                    self.albums = response[1].topalbums.album;
                    self.mainimage = Utilities.getImage(self.artist, 'extralarge');
                }, function(reason) {
                    $log.warn('Error ::: ', reason);
                    Utilities.showAlert('Bit of a problem loading data...Sorry.');
                });
        }

        this.getAlbum = function(album){
            if(album.mbid){
                $location.path('/artist/' + this.artistname + '/album/' + album.mbid);
            }
        };

        // For similar artists, lastfm don't provide the mbid, just the name.
        // Safe to get artist by name though, given they provided it...
        this.selectArtist = function(artist) {
            $log.info('selectArtist ', artist, artist.name);
            if(artist.name){
                $location.path('/artist/' + artist.name);
            }                       
        };

        this.getImage = function(album, size){
            return Utilities.getImage(album, size);
        };
    });

/*

Sort of prefer using the mbid of an artist.
However, similar artists arrive from last.fm without the mbid, just the name
So using mbid would mean looking up the similar artist just to get the mbid, then loading the route,
which would look up the artist again.
Using the artist name (...which does have certain problems) means only changing the route 

So that's what I've done here.

*/