class Material {
    material_id: number;
    unit: string;
    purchase_quantity: number;
    purchase_cost: number;
    clinic_id: number;
    inserted_at: string;

    constructor(material: any) {
        this.material_id = material.material_id;
        this.unit = material.unit;
        this.purchase_quantity = material.purchase_quantity;
        this.purchase_cost = material.purchase_cost;
        this.clinic_id = material.clinic_id;
        this.inserted_at = material.inserted_at;
    }
}
