'use strict';

angular.module('sw.materialfm')
    .controller('AlbumController', function ($routeParams, $log, $location, LastFM, Utilities) {

        this.artistname = $routeParams.artistname;
        this.albummbid = $routeParams.albummbid; // + '123'; // force error...
        this.album = {};
        this.links = [];
        var self = this;

        if(this.albummbid){
            
            LastFM.getAlbumInfo(this.albummbid, {})
                .then(function(response) {
                    // $log.info('getAlbumInfo > response ::: ', response);
                    if(response.error){
                        $log.warn('Last FM ERROR ::: ', response.message || 'Last.fm couldn\'t find the album');
                        Utilities.showAlert(response.message || 'Last.fm couldn\'t find the album', self.closedCallback);
                        return;
                    }
                    self.album = response.album;
                    self.mainimage = self.getImage(self.album, 'extralarge');
                    self.links = ([{title:self.album.artist, url:'/artist/'+self.artistname}, {title:self.album.name, url:''}]);
                }, function(reason) {
                    $log.warn('Error ::: ', reason);
                    Utilities.showAlert('Bit of a problem loading data...Sorry.');
                });
        }

        this.closedCallback = function(event){
            $log.info('closedCallback!! ', event);
        };
        this.getImage = function(collection, size){
            return Utilities.getImage(collection, size);
        };
        this.getDuration = function(duration){
            return Utilities.getDuration(duration);
        };
    });