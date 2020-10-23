export enum BadgeTypes {
    contact = "kişiler listesinde",
    family = "aile üyesi",
    waitingApprove = "onay bekliyor"
}

export interface Badge {
    id: Number,
    name: BadgeTypes,
}
