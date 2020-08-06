import React, {useState} from 'react';
import './FloatTable.scss'
import {ItemTable} from './ItemTable';

export const FloatTable = (props: any) => {

    let onAddClick = () => {
        props.onAddClick(
            {
                name: nameValue!=='No Name'?nameValue:undefined,
                path: pathValue!=='/def'?pathValue:undefined,
                grade: gradeValue!==0?gradeValue:undefined,
                shots: shotsValue!==0?shotsValue:undefined,
                rating: ratingValue!==0?ratingValue:undefined,
                deckCover: deckCoverValue!=='url or base64'?nameValue:undefined,
                private: privateValue!==false?privateValue:undefined,
                type: typeValue!=='pack'?typeValue:undefined,
            }
        )
        props.changeHide(true)
    }

    let [nameValue, changeNameValue] = useState('No Name')
    let [nameEditMode, switchNameEditMode] = useState(false)

    let [pathValue, changePathValue] = useState('/def')
    let [pathEditMode, switchPathEditMode] = useState(false)

    let [gradeValue, changeGradeValue] = useState(0)
    let [gradeEditMode, switchGradeEditMode] = useState(false)

    let [shotsValue, changeShotsValue] = useState(0)
    let [shotsEditMode, switchShotsEditMode] = useState(false)

    let [ratingValue, changeRatingValue] = useState(0)
    let [ratingEditMode, switchRatingEditMode] = useState(false)

    let [deckCoverValue, changeDeckCoverValue] = useState('url or base64')
    let [deckCoverEditMode, switchDeckCoverEditMode] = useState(false)

    let [privateValue, changePrivateValue] = useState(false)
    let [privateEditMode, switchPrivateEditMode] = useState(false)

    let [typeValue, changeTypeValue] = useState('pack')
    let [typeEditMode, switchTypeEditMode] = useState(false)


    return (
        <>
            <div className={'addItemForm '}>
                <tbody>
                <tr className={'head-row'}>
                    <td>name:</td>
                    <td>path:</td>
                    <td>grade:</td>
                    <td>shots:</td>
                    <td>rating:</td>
                    <td>deckCover:</td>
                    <td>private:</td>
                    <td>type:</td>
                </tr>
                <tr className={'custom-row'}>
                    <ItemTable itemValue={nameValue} changeItemValue={changeNameValue} type={'text'}
                               itemEditMode={nameEditMode} switchItemEditMode={switchNameEditMode}/>

                    <ItemTable itemValue={pathValue} changeItemValue={changePathValue} type={'text'}
                               itemEditMode={pathEditMode} switchItemEditMode={switchPathEditMode}/>

                    <ItemTable itemValue={gradeValue} changeItemValue={changeGradeValue} type={'number'}
                               itemEditMode={gradeEditMode} switchItemEditMode={switchGradeEditMode}/>

                    <ItemTable itemValue={shotsValue} changeItemValue={changeShotsValue} type={'number'}
                               itemEditMode={shotsEditMode} switchItemEditMode={switchShotsEditMode}/>

                    <ItemTable itemValue={ratingValue} changeItemValue={changeRatingValue} type={'number'}
                               itemEditMode={ratingEditMode} switchItemEditMode={switchRatingEditMode}/>

                    <ItemTable itemValue={deckCoverValue} changeItemValue={changeDeckCoverValue} type={'text'}
                               itemEditMode={deckCoverEditMode} switchItemEditMode={switchDeckCoverEditMode}/>

                    <ItemTable itemValue={privateValue} changeItemValue={changePrivateValue} type={'checkbox'}
                               itemEditMode={privateEditMode} switchItemEditMode={switchPrivateEditMode}/>

                    <ItemTable itemValue={typeValue} changeItemValue={changeTypeValue} type={'text'}
                               itemEditMode={typeEditMode} switchItemEditMode={switchTypeEditMode}/>
                </tr>
                </tbody>
            </div>
            <button onClick={onAddClick}>ADD</button>
        </>
    )
}