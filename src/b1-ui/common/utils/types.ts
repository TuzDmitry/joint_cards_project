
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

// export type PropsUpdatePackType= CardsPackType &{_id:string}
export type PropsUpdatePackType= {
    _id:string
    name: string
    path: string
    grade: number
    shots: number
    rating: number
    // deckCover?: string
    private: boolean
    type: string
}

export type QueryGetParamsType = {
    packName: string
    min: number | null
    max: number | null
    sortPacks: {
        goal: string
        up: boolean
    }
    user_id: string
    page: number
    pageCount: number
}