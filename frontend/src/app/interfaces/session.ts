/* eslint-disable @typescript-eslint/no-unused-vars */
interface userInterface {
    id: number,
    user_name: string,
    email: string,
    name: string,
    last_name: string,
    profilePhoto: string | null,
    rol: number,
    status: number,
    created_at: string,
    updated_at: string | null,
    statusPlaceholder: string,
    rolPlaceholder: string
}

interface sessionInterface {
    AuthToken: string | null,
    data: userInterface | null,
    status: boolean,
    msg: string | null,
}

export type {
    userInterface,
    sessionInterface,
}
