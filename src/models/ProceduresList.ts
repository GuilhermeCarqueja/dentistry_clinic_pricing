class ProceduresList {
    list_id: number;
    list_name: string;
    clinic_id: number;
    inserted_at: string;

    constructor(list: any) {
        this.list_id = list.list_id;
        this.list_name = list.list_name;
        this.clinic_id = list.clinic_id;
        this.inserted_at = list.inserted_at;
    }
}
