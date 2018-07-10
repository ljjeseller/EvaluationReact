/**
 * Created by admini on 2016/10/18.
 */

const initialState = {
    name: "",
    password: "",
    isLogin: false,
    isFetching: false
};

const userState = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_NAME':
            return {
                ...state,
                name: action.newName
            };
        case 'CHANGE_PASSWORD':
            return {
                ...state,
                password: action.newPassword
            };
        case 'AJAX_LOGIN_REQUEST':
            return {
                ...state,
                isFetching: true
            };
        case 'AJAX_LOGIN_SUCCESS':
            return {
                ...state,
                isFetching: false,
                isLogin: true
            };
        case 'AJAX_LOGIN_FAILURE':
            return {
                ...state,
                isFetching: false
            };
        case 'LOG_OUT':
            return {
                ...state,
                userName: "",
                isLogin: false,
            };
        default:
            return state
    }
};

export default userState;




