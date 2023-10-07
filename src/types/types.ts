export interface iContact {
    name: string,
    email: string,
    phone: string,
    id: string,
    isEnrolled?: boolean
}

export interface iEmail {
    to: string,
    from: string,
    subject: string,
    html: string,
}