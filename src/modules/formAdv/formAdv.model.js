const mongoose = require('mongoose');

const EvaluationSchema = new mongoose.Schema({
    migrationCountryIntent: {
        type: [String], // تا سقف 2 مورد
        required: false,

    },
    migrationInterest: {
        type: [String], // تا سقف 3 مورد
        required: false,

    },
    basicInfo: {
        fullName: { type: String, required: false },
        birthYear: { type: String, required: false }, // فرمت تاریخ: YYYY
        nationality: { type: String, required: false, },
        gender: { type: String, required: false,},
        mobile: { type: String, required: false },
        phone: { type: String, required: false },
        email: { type: String, required: false },
        maritalStatus: { type: String, required: false,},
    },
    educationalInfo: {
        highestDegree: {
            type: String,
            required: false,

        },
        degreeYear: { type: String, required: false }, // فرمت تاریخ: YYYY
        fieldOfStudy: { type: String, required: false },
        englishProficiency: {
            type: String,
            required: false,

        },
        frenchProficiency: {
            type: String,
            required: false,

        },
    },
    workInfo: {
        jobExperience:{
            lastJobTitle: { type: String, required: false },
            yearsOfExperience: {
                type: String,
                required: false,

            },
        }
    },
    possessions:{
        type: [String],

    },
    relativesInCanada: {
        type: String,
        required: false,

    },
    spouseInfo: {
        marriageYear: { type: String, required: false }, // فرمت تاریخ: YYYY
        spouseBirthYear: { type: String, required: false }, // فرمت تاریخ: YYYY
        spouseHighestDegree: {
            type: String,
            required: false,

        },
        spouseDegreeYear: { type: String, required: false }, // فرمت تاریخ: YYYY
        spouseFieldOfStudy: { type: String, required: false },
        spouseEnglishProficiency: {
            type: String,
            required: false,

        },
        spouseFrenchProficiency: {
            type: String,
            required: false,

        },
        spouseLastJobTitle: { type: String, required: false },
        spouseYearsOfExperience: {
            type: String,
            required: false,

        },
        spouseRelativesInCanada: {
            type: String,
            required: false,

        },
    },
    children: {
        type: String,
        required: false,

    },
    totalAssets: {
        type: String,
        required: false,


    },
    previousTravel: {type: String, required: false},
    countriesVisited: [],
    visaRejectionCanada:{ type: String, required: false },
    currentCanadianVisa: { type: String, required: false },
    referralSource: { type: String, required: false },
    additionalNotes: { type: String, required: false },
    consultationRequest: { type: String, required: false },
}, { timestamps: true });

module.exports = mongoose.model('Evaluation', EvaluationSchema);
