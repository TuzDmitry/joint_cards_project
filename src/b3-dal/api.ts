import axios from 'axios';


const instance = axios.create({
    // baseURL: 'https://cards-nya-back.herokuapp.com/1.0/'
    baseURL: 'http://localhost:7542/1.0/'
})

export type UserDataType = {
    email: string
    password: string,
    rememberMe?: boolean
    success?:any
}

export const jointCardsApi = {
    setUserData(email: string, password: string) {
        return instance.post<UserDataType>('auth/register', {email, password})
            // .then(res => {
            //     debugger
            //     return res
            // })
            // .catch(res=>{
            //     debugger
            //     return res
            // })

    },
    logIn(email: string, password: string, rememberMe: boolean) {
        return instance.post<any>('auth/login', {email, password, rememberMe})
        // .then(res => {
        //     debugger
        //     return res
        // })
        // .catch(res => {
        //     debugger
        //     return res
        // })
    }
}

