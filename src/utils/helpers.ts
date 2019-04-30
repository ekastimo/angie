import {IPerson} from '../modules/contacts/types';

export const renderName = (person: IPerson, salutation?: boolean): string => {
    const name: string =
        salutation ?
            `${person.salutation || ''} ${person.firstName || ''} ${person.middleName || ''} ${person.lastName || ''}`
            : `${person.firstName || ''} ${person.middleName || ''} ${person.lastName || ''}`;

    return name.trim().replace(/\s+/g, ' ');
};

export function isNullOrEmpty(value: any) {
    return value === null || typeof value === 'undefined' || value.length < 1;
}

export const trimSentence = (data: string, limit: number): string => {
    let result = '';
    const words = data.split(' ');
    for (const word of words) {
        const temp = `${result} ${word}`;
        if (temp.length >= limit) {
            return result.trim() + '...';
        }
        result = temp;
    }
    return result;
};


export const random = () => {
    return Math.floor(Math.random() * 99999999) + 1;
};

export const safeGet = (data: any, field: string) => {
    try {
        return data[field];
    } catch (e) {
        return;
    }
};


export const parseAvatar = (value: string): string => {
    if (isNullOrEmpty(value)) {
        return '';
    }
    const parts = value.trim().split(' ');
    if (parts.length > 1) {
        const part1 = parts[0].trim();
        const part2 = parts[1].trim();
        return `${part1[0]}${part2[0]}`.toLocaleUpperCase();
    }
    return value.trim()[0].toLocaleUpperCase();
};

