'use strict';

angular.module('sw.common')
    .factory('Utilities', function ($log, $mdDialog) {

        var placeholder = 'http://placehold.it/174x174';

        var Util = {

            getImage : function(collection, size){
                var imgsrc = '';
                if(collection.image && collection.image.length){
                    imgsrc = _.result(_.findWhere(collection.image, { 'size': size }), '#text');
                }
                if(collection && !imgsrc){
                    imgsrc = placeholder + '?text=no+image+for+' + collection.name;
                }
                return imgsrc;
            },
            getDuration : function(duration){
                var mins = ~~(duration / 60),
                    secs = duration % 60,
                    pretty = '' + mins + ':' + (secs < 10 ? '0' : '');
                pretty += '' + secs;
                return pretty;
            },
            showAlert : function(message, closedCallback) {
                $mdDialog.show(
                  $mdDialog.alert({onRemoving: closedCallback})
                    .clickOutsideToClose(true)
                    .title('Warning')
                    .textContent(message)
                    .ariaLabel('Alert Dialog')
                    .ok('Got it!')
                ).finally(function() {
                    // $log.info('...alert closed...'); // could just use this instead of onRemoving
                    // closedCallback();
                });
            }
        }

        return Util;
    });