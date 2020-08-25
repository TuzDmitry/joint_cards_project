import React, {useState} from 'react';
import './../floatTable/FloatTable.scss'
import {ItemTable} from '../floatTable/ItemTable';
import {PackType, PropsUpdatePackType} from '../../../b1-ui/common/utils/types';


type PropsType={
    item:PackType
    onUpdateClick: (data:PropsUpdatePackType)=>void
    hideUpdatePanel:(hide:boolean)=>void
}

export const UpdateTable = (props: PropsType) => {

    let onUpdateClick = () => {
        props.onUpdateClick({
            grade: gradeValue,
            name: nameValue,
            path: pathValue,
            private: privateValue,
            rating: ratingValue,
            shots: shotsValue,
            type: typeValue,
            _id: props.item._id,
        })
        props.hideUpdatePanel(true)
    }

    let [nameValue, changeNameValue] = useState(props.item.name)
    let [nameEditMode, switchNameEditMode] = useState(false)

    let [pathValue, changePathValue] = useState(props.item.path)
    let [pathEditMode, switchPathEditMode] = useState(false)

    let [gradeValue, changeGradeValue] = useState(props.item.grade)
    let [gradeEditMode, switchGradeEditMode] = useState(false)

    let [shotsValue, changeShotsValue] = useState(props.item.shots)
    let [shotsEditMode, switchShotsEditMode] = useState(false)

    let [ratingValue, changeRatingValue] = useState(props.item.rating)
    let [ratingEditMode, switchRatingEditMode] = useState(false)

    let [privateValue, changePrivateValue] = useState(props.item.private)
    let [privateEditMode, switchPrivateEditMode] = useState(false)

    let [typeValue, changeTypeValue] = useState(props.item.type)
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

                    <ItemTable itemValue={privateValue} changeItemValue={changePrivateValue} type={'checkbox'}
                               itemEditMode={privateEditMode} switchItemEditMode={switchPrivateEditMode}/>

                    <ItemTable itemValue={typeValue} changeItemValue={changeTypeValue} type={'text'}
                               itemEditMode={typeEditMode} switchItemEditMode={switchTypeEditMode}/>
                </tr>
                </tbody>
            </div>
            <button onClick={onUpdateClick}>UPDATE</button>
        </>
    )
}