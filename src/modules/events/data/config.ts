import {guid} from '@/utils/helpers';


export const meetingTimes = ['9am', '10am', '11am'];


export const newContact = {
    metaData: {
        churchLocation: null,
        cellGroup: null
    },
    person: {
        lastName: null,
        middleName: null,
        civilStatus: null,
        gender: null,
        ageRange: null,
        avatar: '',
        about: '',
    },
    events: [
        {
            category: null,
            value: null,
            key: guid()
        }
    ],
    emails: [
        {
            value: null,
            category: null,
            isPrimary: true,
            id: guid()
        }
    ],
    phones: [
        {
            value: null,
            category: null,
            isPrimary: true,
            id: guid()
        }
    ],
    addresses: [
        {
            freeForm: null,
            placeId: null,
            latLon: null,
            category: null,
            isPrimary: true,
            id: guid()
        }
    ],
    tags: [],
};



