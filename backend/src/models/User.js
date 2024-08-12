export class User {
    
    constructor (user) {
        this.user_id = user.user_id;
        this.user_street = user.user_street;
        this.user_address_number = user.user_address_number;
        this.user_email = user.user_email;
        this.user_type = user.user_type;
        this.user_name = user.user_name;
        this.user_code = user.user_code;
        this.zip_code = user.zip_code;
        this.inserted_at = user.inserted_at;
        this.address_complement = user.address_complement;
    }
}

