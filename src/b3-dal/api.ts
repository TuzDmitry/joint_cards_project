import axios from 'axios';


const instance = axios.create({
    // baseURL: 'https://cards-nya-back.herokuapp.com/1.0/'
    baseURL: 'http://localhost:7542/1.0/'
})

export type UserDataType = {
    email: string
    password: string,
    rememberMe?: boolean
    success: boolean
}

export type LoginType = {
    email: string
    name: string
    token: string
    tokenDeathTime: number
    _id: string
    publicCardPacksCount: number
}
export const jointCardsApi = {
    setUserData(email: string, password: string) {
        return instance.post<UserDataType>('auth/register', {email, password})

    },
    logIn(email: string, password: string, rememberMe: boolean) {
        return instance.post<LoginType>('auth/login', {email, password, rememberMe})

    },
    checkAuth(token: string) {
        return instance.post<LoginType>('auth/me', {token})

    }
}

export type PackType={
    cardsCount: number
    created: string
    grade: number
    name: string
    path: string
    private: boolean
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    user_name: string
    __v: number
    _id: string

}

export const CardsAPI = {
    // getCards(token:string) {
    //     return instance.get<any>(`cards/pack?token=${token}&pageCount=3`)
    // },

    getCardsWithSettings(token:string, page: number, pageCount: number) {
        return instance.get<any>(`cards/pack?token=${token}&page=${page}&pageCount=${pageCount}`)
    }
}

