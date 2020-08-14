// export const required = (value) => {
//     return value
//         ? undefined
//         : "line is required"
// }

const minLength = (min:number) => {
    return (value:string) => value && value.length < min ? `Must be ${min} characters or more` : undefined
}

export const minLength1 = minLength(1)

export const minLength7 = minLength(7)

export const email = (value:string) => {
    return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'Invalid email address'
        : undefined
}
