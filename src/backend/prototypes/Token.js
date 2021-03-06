import { Make } from '../modules/make.js';
import Logger from './Logger.js';
import Model from './Model.js';
import bcrypt from 'bcrypt-nodejs';

let logger = Make(Logger)('Token Constructor');

/**
* @lends User.prototype
*/
let Token = Make({
    /**
    * @type {string}
    */
    userID : null,

    /**
    * @type {string}
    */
    token : null,

    /**
    * @type {string}
    */
    lastModifiedDate : null,

    /**
    * @constructs
    */
    _make : function(){
        bcrypt.genSalt(5, (error, salt) => {
            if (error){
                logger.error(error);
            } else {
                bcrypt.hash(Date.now, salt, null, (error, hash) => {
                    if (error){
                        logger.error(error);
                    } else {
                        this.token = hash;
                    }
                });
            }
        });
        this.lastModifiedDate = new Date();
    }

}, Model).get();

export default Token;
