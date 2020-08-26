import axios from 'axios';
import {FormDataType} from '../b1-ui/common/TemplateFormComponent/TemplateForm';
import {
    CardsPackType, DataFormCardType,
    PackType, ParamsGetCardsType,
    PropsUpdatePackType,
    QueryGetParamsType,
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

type LoginType = {
    email: string
    name: string
    token: string
    tokenDeathTime: number
    _id: string
    publicCardPacksCount: number
}

type RecoveryType = {
    html: string
    info: any
    status: string
    success: boolean
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

type AddPackCardsResponseType = {
    newCardsPack: PackType
    success: boolean
    token: string
    tokenDeathTime: number
}

type DeletePackCardsResponseType = {
    deletedCardsPack: PackType
    success: boolean
    token: string
    tokenDeathTime: number
}

type UpdatePackCardsResponseType = {
    success: boolean,
    token: string,
    tokenDeathTime: number,
    updatedCardsPack: PackType
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
        return instance.post<AddPackCardsResponseType>(`cards/pack`,
            {cardsPack, token}
        )
    },

    delPackWithCards(token: string, id_pack: string) {
        return instance.delete<DeletePackCardsResponseType>(`cards/pack?token=${token}&id=${id_pack}`)
    },
    updatePackWithCards(params: PropsUpdatePackType, token: string) {
        debugger
        return instance.put<UpdatePackCardsResponseType>(`cards/pack`,
            {
                cardsPack: params,
                token
            }
        )
    },

}

type CardType ={
    answer: string
    cardsPack_id: string
    created:  string
    grade: number
    question:  string
    rating: number
    shots: number
    type:  string
    updated:  string
    user_id:  string
    __v: number
    _id:  string
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
type AddCardsResponseType ={
    newCard: CardType
    success: boolean,
    token: string,
    tokenDeathTime: number,
}
type UpdateCardsResponseType ={
    updatedCard: CardType
    success: boolean,
    token: string,
    tokenDeathTime: number,
}
type DeleteCardsResponseType ={
    deletedCard: CardType
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
        return instance.post<AddCardsResponseType>(`cards/card`,
            {
                card: formData,
                token
            })
    },
    updateCards(formData: DataFormCardType, token: string) {
        debugger
        return instance.put<UpdateCardsResponseType>(`cards/card`,
            {
                card: formData,
                token
            })
    },
    deleteCards(token: string, CardId: string) {
        return instance.delete<DeleteCardsResponseType>(`cards/card?token=${token}&id=${CardId}`)
    }

}
