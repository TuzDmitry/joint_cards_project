export const saveStateToLocalStorage = (state:string, key:string) => {

    let stateAsString = JSON.stringify(state);
    localStorage.setItem(key, stateAsString);
}

export const restoreStateLocalStorage = (key:string, defState:string) => {

    let state = defState;
    let stateAsString = localStorage.getItem(key);
    if (stateAsString != null) {
        state = JSON.parse(stateAsString);
    }
    return state;
}


// export const saveState = (state) => {
//     localStorage.setItem("our-state", JSON.stringify(state));
// }
//
//
// export const restoreState = () => {
//     let state = {
//         tasks: [],
//         filterValue: "All"
//     }
//     let stateAsString = localStorage.getItem("our-state")
//     if (stateAsString) {
//         state = JSON.parse(stateAsString);
//     }
//     return state
//
// }
