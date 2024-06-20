class User {
    user_id: number;
    user_street: string;
    user_address_number: number;
    user_email: string;
    user_type: string;
    user_name: string;
    zip_code: string;
    address_complement?: string;
    inserted_at: string;

    constructor(
        user_id: number,
        user_street: string,
        user_address_number: number,
        user_email: string,
        user_type: string,
        user_name: string,
        zip_code: string,
        inserted_at: string,
        address_complement?: string
    ) {
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

