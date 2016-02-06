import { application } from '../../modules/angular.js';
import NoteService from '../../services/NoteService.js';

application.controller('NoteGridController', ['$scope', '$mdDialog', function($scope, $mdDialog){

    NoteService.on('notesAvailable', noteList => {
        $scope.noteList = noteList;
        $scope.$apply();
    });

    NoteService.getNotes();

    $scope.getCardSize = function(note){
        if (note.content.length < 600) {
            return 3;
        } else if (note.content.length < 1000) {
            return 6;
        } else if (note.content.length < 1500) {
            return 9;
        } else {
            return 12;
        }
    };

    $scope.openDialog = function(event) {
        NoteService.noteEditor($mdDialog, event);
    };
}])
