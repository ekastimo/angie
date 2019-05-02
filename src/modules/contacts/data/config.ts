import * as rules from '@/utils/validations';

export const ageRanges = ['0-12', '13-18', '18-35', '35-50', '50+'];
export const contactCategory = ['Person', 'Company'];
export const identificationCategory = ['Nin', 'Passport', 'DrivingPermit', 'VillageCard', 'Nssf', 'Other'];
export const gender = ['Male', 'Female'];
export const salutation = ['Mr', 'Mrs', 'Ms', 'Dr', 'Prof'];
export const civilStatus = ['Single', 'Married', 'Divorced', 'Other'];
export const emailCategories = ['Personal', 'Work', 'Other'];
export const phoneCategories = ['Mobile', 'Office', 'Home', 'Fax', 'Other'];
export const addressCategories = ['Home', 'Work', 'Other'];
export const dateCategories = ['Birthday', 'Anniversary', 'Other'];
export const validationRules = {
    churchLocation: [
        rules.required()
    ],
    cellGroup: [
        rules.required()
    ],
    lastName: [
        rules.required()
    ],
    firstName: [
        rules.required()
    ],
    middleName: [
        rules.isWord()
    ],
    email: [
        rules.required(), rules.isEmail()
    ],
    phone: [
        rules.required(), rules.isPhone()
    ],
    gender: [
        rules.required()
    ],
    civilStatus: [
        rules.required()
    ],
    ageRange: [
        rules.required()
    ],
    dateOfBirth: [
        rules.required()
    ]
};



