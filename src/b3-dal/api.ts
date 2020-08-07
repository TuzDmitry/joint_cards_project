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

export type PackType = {
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

export type CardsPackType = {
    name?: string
    path?: string
    grade?: number
    shots?: number
    rating?: number
    deckCover?: string
    private?: boolean
    type?: string
}


export type QueryGetParamsType = {
    packName: string | undefined
    min: number | undefined
    max: number | undefined
    sortPacks: {
        goal: string | undefined, up: boolean
    }
    page: number | undefined
    pageCount: number | undefined
    user_id: string | undefined
}


export const CardsAPI = {
    getCardsWithSettings(token: string, params: any = {}) {
        debugger
        let {packName, min, max, sortPacks, page, pageCount, user_id} = params;

        let id = user_id ? `&user_id=${user_id}` : ''
        let elsOnPage = pageCount ? `&pageCount=${pageCount}` : ``
        let pageNum = page ? `&page=${page}` : '&page=1'

        let sortGoal = sortPacks ?
            sortPacks.goal && sortPacks.up ? `&sortPacks=1${sortPacks.goal}` : `&sortPacks=0${sortPacks.goal}`
            : ``
        let maxVal = max ? `&max=${max}` : ''
        let minVal = min ? `&min=${min}` : ''
        let search = packName ? `&packName=${packName}` : ''

        return instance.get<any>(`cards/pack?token=${token}${search}${minVal}${maxVal}${sortGoal}${pageNum}${elsOnPage}${id}`)
    },

    addPackWithCards(cardsPack: CardsPackType, token: string) {

        return instance.post<any>(`cards/pack`,
            {cardsPack, token}
        )
    },
}
