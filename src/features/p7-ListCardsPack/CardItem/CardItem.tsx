import {useDispatch} from 'react-redux';
import {CardType, CreateCard, DeleteCard, UpdateCards} from '../../../b2-bll/CardsReducer';
import React, {useState, ChangeEvent} from 'react';
import {useForm} from 'react-hook-form';
import {minLength1, minLength7} from '../../../b1-ui/common/utils/validators';
import {DataFormCardType} from '../../../b1-ui/common/utils/types';

type PropsType={
    onChangeClick: () => void
    show:boolean
    setIsUpdating: (val: boolean) => void
    item: CardType
}

export const ChangeFormModal = (props:PropsType) => {
    const dispatch=useDispatch()
    const {handleSubmit, register, errors, reset} = useForm<DataFormCardType>();

    const onSubmit = (formData:DataFormCardType) => {
        debugger
        console.log(formData);
        dispatch(UpdateCards(props.item.cardsPack_id, {_id:props.item._id, ...formData}))
        props.onChangeClick()
    }

    let onResetClick=()=>{
        reset()
    }

    let [question, changeQuestion] = useState(props.item.question)
    let [answer, changeAnswer] = useState(props.item.answer)
    let [grade, changeGrade] = useState(props.item.grade)
    let [shots, changeShots] = useState(props.item.shots)
    let [rating, changeRating] = useState(props.item.rating)

    return (
        <div style={{display:props.show?"block":'none'}}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input name="question"
                       // placeholder={props.item.question}
                       value={question}
                       ref={register({
                           required: 'Required',
                           validate: value => minLength7(value)
                       })}
                       onChange={(e:ChangeEvent<HTMLInputElement>)=>changeQuestion(e.currentTarget.value)}
                />
                {errors.question && errors.question.message}

                <input name="answer"
                       placeholder="Write answer"
                       value={answer}
                       ref={register({
                           required: 'Required',
                           validate: value => minLength1(value)
                       })}
                       onChange={(e:ChangeEvent<HTMLInputElement>)=>changeAnswer(e.currentTarget.value)}
                />
                {errors.answer && errors.answer.message}

                <input name="grade"
                       type='number'
                       placeholder="Write grade"
                       value={grade}
                       ref={register({
                           required: 'Required',
                           validate: value => minLength1(value)
                       })}
                       onChange={(e:ChangeEvent<HTMLInputElement>)=>changeGrade(+e.currentTarget.value)}
                />
                {errors.grade && errors.grade.message}

                <input name="shots"
                       type='number'
                       placeholder="Write shots"
                       value={shots}
                       ref={register({
                           required: 'Required',
                           validate: value => minLength1(value)
                       })}
                       onChange={(e:ChangeEvent<HTMLInputElement>)=>changeShots(+e.currentTarget.value)}
                />
                {errors.shots && errors.shots.message}

                <input name="rating"
                       type='number'
                       placeholder="Write rating"
                       value={rating}
                       ref={register({
                           required: 'Required',
                           validate: value => minLength1(value)
                       })}
                       onChange={(e:ChangeEvent<HTMLInputElement>)=>changeRating(+e.currentTarget.value)}
                />
                {errors.rating && errors.rating.message}


                {/*<div style={{width:"100px", height:"50px", backgroundColor: 'red'}}>*/}

                {/*    <input type="button" onClick={onResetClick} />*/}
                {/*    /!*<button onClick={reset} >RESET</button>*!/*/}
                {/*</div>*/}

                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
            <button onClick={()=> props.setIsUpdating(false)}>X</button>
        </div>
    )
}





type PropsType1 = {
    item: CardType
    key: string

}

export const CardItem = (props: PropsType1) => {

    let [isUpdating, setIsUpdating] = useState(false)

    let dispatch = useDispatch();

    let onDeleteItem = () => {
        dispatch((DeleteCard(props.item._id, props.item.cardsPack_id)))
    }
    let onChangeClick = () => {
        setIsUpdating(!isUpdating)

    }

    return (

        <>
            {isUpdating ?
                <ChangeFormModal  show={isUpdating} setIsUpdating={setIsUpdating} item={props.item} onChangeClick={onChangeClick} />
                : <div className={'item'}>
                    <div>{props.item.question}</div>
                    <div className={'name'}>{props.item.rating}</div>
                    <div>{props.item.shots}</div>
                    <div className={'grade'}>{props.item.grade}</div>
                    <div>
                        <button className={'butTable'} onClick={onChangeClick}>CHANGE</button>
                        <button onClick={onDeleteItem}>DELETE</button>
                    </div>
                </div>
            }
        </>

    )
};

