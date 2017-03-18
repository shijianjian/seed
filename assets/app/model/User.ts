/**
 * Created by shijian on 18/03/2017.
 */

export class User {
    set user_id(value: string) {
        this._user_id = value;
    }
    private _email:          string;
    private _family_name:    string;
    private _given_name:     string;
    private _name:           string;
    private _phone_number:   string;
    private _user_id:        string;
    private _user_name:      string;

    constructor(
        email:          string,
        family_name:    string,
        given_name:     string,
        name:           string,
        phone_number:   string,
        user_id:        string,
        user_name:      string) {
        this._email = email;
        this._family_name = family_name;
        this._given_name = given_name;
        this._name = name;
        this._phone_number = phone_number;
        this._user_id = user_id;
        this._user_name = user_name;
    }

    get user_id(): string {
        return this._user_id;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get family_name(): string {
        return this._family_name;
    }

    set family_name(value: string) {
        this._family_name = value;
    }

    get given_name(): string {
        return this._given_name;
    }

    set given_name(value: string) {
        this._given_name = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get phone_number(): string {
        return this._phone_number;
    }

    set phone_number(value: string) {
        this._phone_number = value;
    }

    get user_name(): string {
        return this._user_name;
    }

    set user_name(value: string) {
        this._user_name = value;
    }
}