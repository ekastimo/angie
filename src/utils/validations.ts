export const required = (name: string = 'Field') => (v: any) => !!v || `${name} is required`;

export const isEmail = (name: string = 'Field') => (v: any) => /.+@.+/.test(v) || `${name} must be an email`;

export const isWord = (name: string = 'Field') => (v: any) => /\w+/.test(v) || `${name} must be an word`;

export const isPhone = (name: string = 'Field') => (v: any) => /[0-9-]+/.test(v) || `${name} must be an phone number`;

export const maxLength = (max: number, name: string = 'Field') =>
    (v: any) => v.length <= max || `${name} must be less than ${max + 1} characters`;

export const minLength = (min: number, name: string = 'Field') =>
    (v: any) => v.length >= min || `${name} must be greater than ${min} characters`;
