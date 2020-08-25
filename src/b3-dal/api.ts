import axios from 'axios';
import {ParamsTableType} from '../b2-bll/TableReducer';
import {FormDataType} from '../b1-ui/common/TemplateFormComponent/TemplateForm';
import {CardsPackType, PackType, PropsUpdatePackType, QueryGetParamsType} from '../b1-ui/common/utils/types';


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
        return instance.put<any>(`cards/pack`,
            {
                cardsPack: params,
                token
            }
        )
    },

}


export const CardsAPI = {
    getCardsChoisedPack(token: string, params: any) {
        debugger
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
        return instance.get<any>(`cards/card?token=${token}${search}${minVal}${maxVal}${sortGoal}${pageNum}${elsOnPage}${id}`)
    },

    getCards(token: string, cardsPack_id: string) {
        return instance.get<any>(`cards/card?token=${token}&cardsPack_id=${cardsPack_id}`)
    },
    createCards(token: string, formData: any) {
        return instance.post<any>(`cards/card`,
            {
                card: formData,
                token
            })
    },
    updateCards(formData: any, token: string) {
        debugger
        return instance.put<any>(`cards/card`,
            {
                card: formData,
                token
            })
    },
    deleteCards(token: string, CardId: string) {
        return instance.delete<any>(`cards/card?token=${token}&id=${CardId}`)
    }

}
