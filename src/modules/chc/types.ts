export interface ILocation {
    id: string
    name: string
    details: string
    meetingTimes: string[]
    tags: string[]
    createdAt: Date
    createdBy: string
}

export interface ILocationMember {
    contactId: string
    locationId: string
    name: string
    avatar: string
}

export interface ICellGroup {
    id: string
    location: string
    name: string
    details: string
    meetingTimes: string[]
    tags: string[]
    createdAt: Date
    createdBy: string
}


export interface ICellGroupMember {
    contactId: string
    locationId: string
    name: string
    avatar: string
}
