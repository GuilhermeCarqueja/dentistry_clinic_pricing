export class Clinic {
    clinicId: number;
    maxPaymentFee?: number;
    taxRate?: number;
    numberOfDailyWorkHours: number;
    clinicName: string;
    numberOfChairs: number;
    numberOfWorkMonths: number;
    expectedVacancy?: number;
    timeCost?: number;
    userId: number;
    insertedAt: string;

    constructor(
        clinicId: number,
        numberOfDailyWorkHours: number,
        clinicName: string,
        numberOfChairs: number,
        numberOfWorkMonths: number,
        userId: number,
        insertedAt: string,
        maxPaymentFee?: number,
        taxRate?: number,
        expectedVacancy?: number,
        timeCost?: number,
    ) {
        this.clinicId = clinicId;
        this.maxPaymentFee = maxPaymentFee;
        this.taxRate = taxRate;
        this.numberOfDailyWorkHours = numberOfDailyWorkHours;
        this.clinicName = clinicName;
        this.numberOfChairs = numberOfChairs;
        this.numberOfWorkMonths = numberOfWorkMonths;
        this.expectedVacancy = expectedVacancy;
        this.timeCost = timeCost;
        this.userId = userId;
        this.insertedAt = insertedAt;
    }
}
