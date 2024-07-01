class ClinicCurrentExpense {
    expense_id: number;
    expense: string;
    clinic_id: number;
    expense_value: number;
    expense_frequency: string;
    inserted_at: string;

    constructor(expense: any) {
        this.expense_id = expense.expense_id;
        this.expense = expense.expense;
        this.clinic_id = expense.clinic_id;
        this.expense_value = expense.expense_value;
        this.expense_frequency = expense.expense_frequency;
        this.inserted_at = expense.inserted_at;
    }
}
