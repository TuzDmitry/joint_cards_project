import React from 'react';

export const ItemTable = (props: any) => {
    return (
        <td>
            {props.itemEditMode ?
                props.type === 'checkbox' ?
                    <input type={props.type}
                           checked={props.itemValue}
                           onBlur={() => props.switchItemEditMode(!props.itemEditMode)}
                           onChange={(e) => props.changeItemValue(e.currentTarget.checked)}/>
                    :
                    <input type={props.type}
                           value={props.itemValue}
                           onBlur={() => props.switchItemEditMode(!props.itemEditMode)}
                           onChange={(e) => props.changeItemValue(e.currentTarget.value)}/>

                : props.type === 'checkbox' ?
                    <div
                        onClick={() => props.switchItemEditMode(!props.itemEditMode)}>{props.itemValue ? 'true' : 'false'}</div>
                    :
                    <div
                        onClick={() => props.switchItemEditMode(!props.itemEditMode)}>{props.itemValue ? props.itemValue : 'default'}</div>


            }
        </td>
    )
}