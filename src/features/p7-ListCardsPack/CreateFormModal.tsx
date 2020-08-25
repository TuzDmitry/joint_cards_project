import React from 'react';
import {useForm} from 'react-hook-form';
import {minLength1, minLength7} from '../../b1-ui/common/utils/validators';
import './CreateFormModal.scss'
import {CreateCard} from '../../b2-bll/CardsReducer';
import {useDispatch} from 'react-redux';

type PropsType={
    cardsPack_id:string
    show:boolean
}

export const CreateFormModal = (props:PropsType) => {
const dispatch=useDispatch()
    const {handleSubmit, register, errors, reset} = useForm();

    const onSubmit = (formData:any) => {
        debugger
        console.log(formData);
        dispatch(CreateCard({cardsPack_id:props.cardsPack_id,  ...formData},reset))
    }

let onResetClick=()=>{
    reset()
}

    return (
        <div className={!props.show?'modelForm show':'modelForm'}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input name="question"
                       placeholder="Write question"
                       ref={register({
                           required: 'Required',
                           validate: value => minLength7(value)
                       })}/>
                {errors.question && errors.question.message}

                <input name="answer"
                       placeholder="Write answer"
                       ref={register({
                           required: 'Required',
                           validate: value => minLength1(value)
                       })}/>
                {errors.answer && errors.answer.message}

                <input name="grade"
                       type='number'
                       placeholder="Write grade"
                       ref={register({
                           required: 'Required',
                           validate: value => minLength1(value)
                       })}/>
                {errors.grade && errors.grade.message}

                <input name="shots"
                       type='number'
                       placeholder="Write shots"
                       ref={register({
                           required: 'Required',
                           validate: value => minLength1(value)
                       })}/>
                {errors.shots && errors.shots.message}

                <input name="rating"
                       type='number'
                       placeholder="Write rating"
                       ref={register({
                           required: 'Required',
                           validate: value => minLength1(value)
                       })}/>
                {errors.rating && errors.rating.message}


                <div style={{width:"100px", height:"50px", backgroundColor: 'red'}}>

                    <input type="button" onClick={onResetClick} />
                    <button onClick={reset} >RESET</button>
                </div>

                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

