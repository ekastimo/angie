import {format, isValid, parse} from 'date-fns';


export const printDateTime = (value: any): string => {
    if (isValid(parse(value))) {
        return format(parse(value), 'MM/dd/yyyy p')
    } else {
        return ''
    }
}

export const printBirthday = (value: any): string => {
    if (isValid(parse(value))) {
        return format(parse(value), 'DD MMM')
    } else {
        return ''
    }
}

export const printMonth = (value: any): string => {
    if (isValid(parse(value))) {
        return format(parse(value), 'MMM')
    } else {
        return ''
    }
}

export const printDay = (value: any): string => {
    if (isValid(parse(value))) {
        return format(parse(value), 'dd')
    } else {
        return ''
    }
}

export const printShortDate = (value: any): string => {
    if (isValid(parse(value))) {
        return format(parse(value), 'dd MMM')
    } else {
        return ''
    }
}

export const printDate = (value: any): string => {
    if (isValid(parse(value))) {
        return format(parse(value), 'MM/dd/yyyy')
    } else {
        return ''
    }
}

export function isValidDate(value: any) {
    if (value === null || typeof value !== 'object') {
        return false;
    }
    const dateWrapper = new Date(value);
    return !isNaN(dateWrapper.getDate());
}
