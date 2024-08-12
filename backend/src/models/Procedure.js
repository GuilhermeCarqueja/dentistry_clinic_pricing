export class Procedure {

    constructor(procedure) {
        this.procedure_id = procedure.procedure_id;
        this.investment_fee = procedure.investment_fee;
        this.procedure_tax = procedure.procedure_tax;
        this.minimum_price = procedure.minimum_price;
        this.professional_cost = procedure.professional_cost;
        this.profit_margin = procedure.profit_margin;
        this.procedure_max_payment_rate = procedure.procedure_max_payment_rate;
        this.procedure_max_payment_cost = procedure.procedure_max_payment_cost;
        this.procedure_time = procedure.procedure_time;
        this.procedure_time_cost = procedure.procedure_time_cost;
        this.list_id = procedure.list_id;
        this.procedure_name = procedure.procedure_name;
        this.final_price = procedure.final_price;
        this.materials_cost = procedure.materials_cost;
        this.inserted_at = procedure.inserted_at;
    }
}
