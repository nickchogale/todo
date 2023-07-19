const token = localStorage.getItem('token');

export const initialState = () =>{
    return false;
}

export const reducer = (state, action) => {

    if(action.type === 'USER'){
        return action.payload;
    }
    return state;
}