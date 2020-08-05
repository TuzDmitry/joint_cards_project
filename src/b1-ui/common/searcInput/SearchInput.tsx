import React, {ChangeEvent, SetStateAction, useState, useEffect} from "react";
import {Input} from "../input/Input";

export const SearchInput = () => {


    const people: Array<string> = [
        "Siri",
        "Alexa",
        "Google",
        "Facebook",
        "Twitter",
        "Linkedin",
        "Sinkedin",
        "Zidan",
        "Ronaldo",
        "Henry",
        "Messi"
    ];


    const [searchItem, setSearchItem] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchItem(e.currentTarget.value)
    }
    useEffect(() => {
        let results: SetStateAction<any> = people.filter(person =>
            person.toLowerCase().includes(searchItem.toLowerCase())
        );
        setSearchResults(results);
    }, [searchItem]);
    return (
        <div>
            <input placeholder="Search" type='text' onChange={handleSearch} />
            <ul>
                {searchResults.map(item => (
                    <li>{item}</li>
                ))}
            </ul>
            {/*<Input placeholder="Search" value={searchItem} changeValue={setSearchItem} />*/}
        </div>
    )
}
