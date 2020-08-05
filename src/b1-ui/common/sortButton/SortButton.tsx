import React, {useState} from 'react';


type PropsType={
    arrayNum:Array<number>
}
export const SortButton = (props:any) => {
    // const people: Array<string> = [
    //     "Siri",
    //     "Alexa",
    //     "Google",
    //     "Facebook",
    //     "Twitter",
    //     "Linkedin",
    //     "Sinkedin",
    //     "Zidan",
    //     "Ronaldo",
    //     "Henry",
    //     "Messi"
    // ];
    // const years: Array<number> = [
    //     888, 986, 11, 1939, 1240, 1648, 1750, 2020
    // ]

    //
    // let y = {...years}
    // const [number, setNumber] = useState(years);
    // const [letter, setLetter] = useState([])

    let innerArray;

    const sortNumberByMinValue = () =>  {
        // let minValueSort: any =  number.sort((a:number, b:number) => a - b);
        // setNumber(minValueSort);
    }



    // let sortNumberByMaxValue = years.sort((a:number, b:number) => b - a)
let b=innerArray?innerArray:props.ArrayNum
    let a=b.map((n: any) => <div>{n}</div>)
    debugger
    return (
        <div>
            {/*{minValueSort ? minValueSort : years }*/}
            {a}
            {/*{number}*/}
            <button onClick={sortNumberByMinValue}>sort by min value</button>
        </div>
    )
}
