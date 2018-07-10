/**
 * Created by admini on 2016/10/18.
 */

const initialState = {
    isFetching: false,
    items: [],
    currentPage: 1,
    total: 0,
    receivedAt: 0
};

const teacherState = (state = initialState, action) => {
    switch (action.type) {
        case 'AJAX_TEACHER_LIST_REQUEST':
            return {
                ...state,
                isFetching: true
            };
        case 'AJAX_TEACHER_LIST_SUCCESS':
            return {
                ...state,
                isFetching: false,
                items: action.items,
                currentPage: action.currentPage,
                total: action.total,
                receivedAt: Date.now()
            };
        case 'AJAX_TEACHER_LIST_FAILURE':
            return {
                ...state,
                isFetching: false
            };
        case 'CHANGE_TEACHER_LIST_PAGE':
            return {
                ...state,
                currentPage: action.currentPage
            };
        default:
            return state
    }
};

export default teacherState;




