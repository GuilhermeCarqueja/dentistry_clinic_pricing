class ProcedureMaterial {
    procedure_id: number;
    material_id: number;
    unit: string;
    procedure_quantity: number;
    inserted_at: string;

    constructor(procMaterial: any) {
        this.procedure_id = procMaterial.procedure_id;
        this.material_id = procMaterial.material_id;
        this.unit = procMaterial.unit;
        this.procedure_quantity = procMaterial.procedure_quantity;
        this.inserted_at = procMaterial.inserted_at;
    }
}
