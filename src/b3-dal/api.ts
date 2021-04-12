import axios from 'axios';
import {FormDataType} from '../b1-ui/common/TemplateFormComponent/TemplateForm';
import {
    CardsPackType, DataFormCardType,
    PackType, ParamsGetCardsType,
    PropsUpdatePackType,
    QueryGetParamsType,
    PayloadProfileDataType,
} from '../b1-ui/common/utils/types';


const instance = axios.create({
    // baseURL: 'https://cards-nya-back.herokuapp.com/1.0/'
    baseURL: 'http://localhost:7542/1.0/'
})

type UserDataType = {
    email: string
    password: string,
    rememberMe?: boolean
    success: boolean
}

export type LoginType = {
    avatar: string
    created: string
    email: string
    isAdmin: boolean
    name: string
    publicCardPacksCount: number
    rememberMe: boolean
    success: boolean
    token: string
    tokenDeathTime: number
    updated: string
    verified: boolean
    __v: number
    _id: string
}


type RecoveryType = {
    html: string
    info: any
    status: string
    success: boolean
}

type CommonUpdatedResponseType = {
    updatedUser: LoginType
    success: boolean
    token: string
    tokenDeathTime: number
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
    },
    changeUserProfileData(token:string, obj:PayloadProfileDataType) {
        debugger

        return instance.put<CommonUpdatedResponseType>('auth/me',
            {token, ...obj}
            )
    },
    // changeUserProfileData(token: string, obj: any) {
    //     debugger
    //     const avatar = new FormData()
    //     avatar.append('myFile', obj.avatar);
    //
    //     return instance.put<CommonUpdatedResponseType>('auth/me',
    //         {token, avatar}
    //     )
    // },
    recoveryPassword(email: string) {
        return instance.post<RecoveryType>('auth/forgot',
            {
                email: email,
                html1: '<a href=\'http://localhost:3000/#/change-password/',
                html2: '\'>reset-password-link</a>'
            }
        )
    },
    updatePassword(formData: FormDataType) {
        return instance.post<{ success: boolean }>('auth/set-new-password',
            {
                resetPasswordToken: formData.reset_Token,
                password: formData.newPassword
            }
        )
    }
}


type GetPackCardsResponseType = {
    cardPacks: Array<PackType>
    cardPacksTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}

type CommonPackCardsResponseType<T> = {
    T: PackType
    success: boolean,
    token: string,
    tokenDeathTime: number,
}

export const PacksCardsAPI = {
    getPacksWithCards(token: string, params: QueryGetParamsType) {
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

        return instance.get<GetPackCardsResponseType>(`cards/pack?token=${token}${search}${minVal}${maxVal}${sortGoal}${pageNum}${elsOnPage}${id}`)
    },

    addPackWithCards(cardsPack: CardsPackType, token: string) {
        return instance.post<CommonPackCardsResponseType<{ newCardsPack: PackType }>>(`cards/pack`,
            {cardsPack, token}
        )
    },

    delPackWithCards(token: string, id_pack: string) {
        return instance.delete<CommonPackCardsResponseType<{ deletedCardsPack: PackType }>>(`cards/pack?token=${token}&id=${id_pack}`)
    },
    updatePackWithCards(params: PropsUpdatePackType, token: string) {
        debugger
        return instance.put<CommonPackCardsResponseType<{ updatedCardsPack: PackType }>>(`cards/pack`,
            {
                cardsPack: params,
                token
            }
        )
    },

}

type CardType = {
    answer: string
    cardsPack_id: string
    created: string
    grade: number
    question: string
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    __v: number
    _id: string
}

type ChoisedCardsPackType = {
    cards: Array<CardType>
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}

type CommonCardResponseType<T> = {
    T: CardType
    success: boolean,
    token: string,
    tokenDeathTime: number,
}


export const CardsAPI = {
    getCardsChoisedPack(token: string, params: ParamsGetCardsType) {
        let {cardQuestion, min, max, sortCards, page, pageCount, cardsPack_id} = params;

        let id = cardsPack_id ? `&cardsPack_id=${cardsPack_id}` : ''
        let elsOnPage = pageCount ? `&pageCount=${pageCount}` : ``
        let pageNum = page ? `&page=${page}` : '&page=1'

        let sortGoal = sortCards.goal ?
            sortCards.goal && sortCards.up ? `&sortCards=1${sortCards.goal}` : `&sortCards=0${sortCards.goal}`
            : ``
        let maxVal = max ? `&max=${max}` : ''
        let minVal = min ? `&min=${min}` : ''
        let search = cardQuestion ? `&cardQuestion=${cardQuestion}` : ''
        debugger
        return instance.get<ChoisedCardsPackType>(`cards/card?token=${token}${search}${minVal}${maxVal}${sortGoal}${pageNum}${elsOnPage}${id}`)
    },
    createCards(token: string, formData: DataFormCardType) {
        return instance.post<CommonCardResponseType<{ newCard: CardType }>>(`cards/card`,
            {
                card: formData,
                token
            })
    },
    updateCards(formData: DataFormCardType, token: string) {
        debugger
        return instance.put<CommonCardResponseType<{ updatedCard: CardType }>>(`cards/card`,
            {
                card: formData,
                token
            })
    },
    deleteCards(token: string, CardId: string) {
        return instance.delete<CommonCardResponseType<{ deletedCard: CardType }>>(`cards/card?token=${token}&id=${CardId}`)
    }

}
