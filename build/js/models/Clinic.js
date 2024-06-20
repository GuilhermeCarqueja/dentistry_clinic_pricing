"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Clinic = void 0;
class Clinic {
    constructor(clinicId, numberOfDailyWorkHours, clinicName, numberOfChairs, numberOfWorkMonths, userId, insertedAt, maxPaymentFee, taxRate, expectedVacancy, timeCost) {
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
exports.Clinic = Clinic;
