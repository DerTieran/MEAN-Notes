
import { Make } from '../../modules/make.js';
import Controller from '../../prototypes/Controller.js';
import Storage from '../../modules/Storage.js';

let NoteController = Make({
    route : '/api/v1/category/',

    name : 'CategoryController',

    collection : 'users',

    put : function(request, response){
        if (request.authenticated){
            let { body : model } = request;

            if (Array.isArray(model.categories)){
                Storage.findItems({ collection : this.collection, find : {_id : request.userID}})
                .then(user => {
                    user.categories = model.categories;

                    Storage.saveItem(this.collection, user)
                    .then(() => {
                        response.send(model.categories);
                    }, error => console.error(error));
                });

            } else {
                response.status(415).send({
                    error : 415,
                    status : 'Categories is not an Array',
                })
            }
        } else {
            response.status(401).send({
                error : 401,
                status : 'Unauthorized'
            });
        }

    },

    get : function(request, response) {
        if (request.authenticated){
            Storage.findItems({ collection : this.collection, find : {_id : request.userID}})
            .then(user => {
                response.send(user.categories);
            });
        } else {
            response.status(401).send({
                error : 401,
                status : 'Unauthorized'
            });
        }

    },


}, Controller).get();

export default NoteController;
