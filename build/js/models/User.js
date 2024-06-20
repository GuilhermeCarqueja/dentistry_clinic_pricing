"use strict";
class User {
    constructor(user_id, user_street, user_address_number, user_email, user_type, user_name, zip_code, inserted_at, address_complement) {
        this.user_id = user_id;
        this.user_street = user_street;
        this.user_address_number = user_address_number;
        this.user_email = user_email;
        this.user_type = user_type;
        this.user_name = user_name;
        this.zip_code = zip_code;
        this.inserted_at = inserted_at;
        this.address_complement = address_complement;
    }
}
