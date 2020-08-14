import React, {useState} from 'react';
import './../floatTable/FloatTable.scss'
import {ItemTable} from '../floatTable/ItemTable';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from '../../../b2-bll/store';
import {actions, ParamsTableType} from '../../../b2-bll/TableReducer';

export const UpdateTable = (props: any) => {

    let onUpdateClick = () => {
        props.onUpdateClick()
        props.hideUpdatePanel(true)
    }

    let {name, path, grade, shots, rating, deckCover, private:privat, type}=useSelector<AppStateType, ParamsTableType>(state => state.tableParams)

    // let [nameValue, changeNameValue] = useState('No Name')
    let changeNameValue=(nameV:string)=>dispatch(actions.SetParamName(nameV))
    let [nameEditMode, switchNameEditMode] = useState(false)

    // let [pathValue, changePathValue] = useState('')
    let changePathValue=(pathV:string)=>dispatch(actions.SetParamPath(pathV))
    let [pathEditMode, switchPathEditMode] = useState(false)

    // let [gradeValue, changeGradeValue] = useState(0)
    let changeGradeValue=(gradeV:number)=>dispatch(actions.SetParamGrade(gradeV))
    let [gradeEditMode, switchGradeEditMode] = useState(false)

    // let [shotsValue, changeShotsValue] = useState(0)
    let changeShotsValue=(shotsV:number)=>dispatch(actions.SetParamShots(shotsV))
    let [shotsEditMode, switchShotsEditMode] = useState(false)

    // let [ratingValue, changeRatingValue] = useState(0)
    let changeRatingValue=(ratingV:number)=>dispatch(actions.SetParamRating(ratingV))
    let [ratingEditMode, switchRatingEditMode] = useState(false)


    // let [privateValue, changePrivateValue] = useState(false)
    let changePrivateValue=(privateV:boolean)=>dispatch(actions.SetParamPrivate(privateV))
    let [privateEditMode, switchPrivateEditMode] = useState(false)

    // let [typeValue, changeTypeValue] = useState('pack')
    let changeTypeValue=(typeV:string)=>dispatch(actions.SetParamType(typeV))
    let [typeEditMode, switchTypeEditMode] = useState(false)

let dispatch=useDispatch()
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
                    <ItemTable itemValue={name} changeItemValue={changeNameValue} type={'text'}
                               itemEditMode={nameEditMode} switchItemEditMode={switchNameEditMode}/>

                    <ItemTable itemValue={path} changeItemValue={changePathValue} type={'text'}
                               itemEditMode={pathEditMode} switchItemEditMode={switchPathEditMode}/>

                    <ItemTable itemValue={grade} changeItemValue={changeGradeValue} type={'number'}
                               itemEditMode={gradeEditMode} switchItemEditMode={switchGradeEditMode}/>

                    <ItemTable itemValue={shots} changeItemValue={changeShotsValue} type={'number'}
                               itemEditMode={shotsEditMode} switchItemEditMode={switchShotsEditMode}/>

                    <ItemTable itemValue={rating} changeItemValue={changeRatingValue} type={'number'}
                               itemEditMode={ratingEditMode} switchItemEditMode={switchRatingEditMode}/>

                    <ItemTable itemValue={privat} changeItemValue={changePrivateValue} type={'checkbox'}
                               itemEditMode={privateEditMode} switchItemEditMode={switchPrivateEditMode}/>

                    <ItemTable itemValue={type} changeItemValue={changeTypeValue} type={'text'}
                               itemEditMode={typeEditMode} switchItemEditMode={switchTypeEditMode}/>
                </tr>
                </tbody>
            </div>
            <button onClick={onUpdateClick}>UPDATE</button>
        </>
    )
}