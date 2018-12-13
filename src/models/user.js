export class User {

    constructor(){

        this._id    = null;
        this._name  = '';
        this._email = '';
        this._mobile = '';
       
    }

    set id(value) {
        this._id = value;
    }

    get id() {
        return this._id;
    }

    set name(value) {
        this._name = value;
    }

    get name() {
        return this._name;
    }

    set email(value) {
        this._email = value;
    }

    get email() {
        return this._email;
    }

    set mobile(value) {
        this._mobile = value;
    }

    get mobile() {
        return this._mobile;
    }

}