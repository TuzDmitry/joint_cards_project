import React from 'react';

export const ItemTable = ({thunkDispatch = null, ...props}: any) => {

    const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            props.switchItemEditMode(!props.itemEditMode);
            thunkDispatch && thunkDispatch()
        }
    }


    let onLeaveEditMode = () => {
        props.switchItemEditMode(!props.itemEditMode)
        thunkDispatch && thunkDispatch()
    }

    return (
        <div>
            {props.itemEditMode ?
                props.type === 'checkbox' ?
                    <input type={props.type}
                           checked={props.itemValue}
                           onBlur={() => props.switchItemEditMode(!props.itemEditMode)}
                           onChange={(e) => props.changeItemValue(e.currentTarget.checked)}/>
                    :
                    <input type={props.type}
                           onKeyPress={onKeyPress}
                           value={props.itemValue}
                           onBlur={onLeaveEditMode}
                           onChange={(e) => props.changeItemValue(e.currentTarget.value)}/>

                : props.type === 'checkbox' ?
                    <div
                        onClick={() => props.switchItemEditMode(!props.itemEditMode)}>{props.itemValue ? 'true' : 'false'}</div>
                    :
                    <div
                        onClick={() => props.switchItemEditMode(!props.itemEditMode)}>{props.itemValue ? props.itemValue : 'default'}</div>


            }
        </div>
    )
}