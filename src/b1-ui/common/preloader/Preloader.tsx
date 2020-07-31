import React from 'react';
// import preloader from "../../../assets/image/Spinner-1s-200px.svg";
import preloader from '../../../assets/images/Preloader.svg'

export const Preloader = () => {
    return <div  style={ { backgroundColor: 'white' } }>
        <img src={preloader} />
    </div>
}

