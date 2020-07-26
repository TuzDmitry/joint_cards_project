import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://cards-nya-back.herokuapp.com/1.0'
})

export type UserDataType = {
    email: string
    password: string
}

export const jointCardsApi = {
    setUserData(email: string, password: string) {
        return instance.post<UserDataType>('/auth/register', {email: email, password: password})
            // .then(res=>{
        //             //     debugger
        //             //     return res.data
        //             // })
    }
}

