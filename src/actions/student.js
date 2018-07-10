/**
 * Created by admini on 2016/10/19.
 */

import { AJAX_STUDENT_LIST_REQUEST, AJAX_STUDENT_LIST_SUCCESS, AJAX_STUDENT_LIST_FAILURE, CHANGE_STUDENT_LIST_PAGE } from '../constants/index.js';
import $ from 'jquery';

function studentListRequest(){
    return {
        type: AJAX_STUDENT_LIST_REQUEST
    }
}

function studentListSuccess(items, currentPage, total){
    return {
        type: AJAX_STUDENT_LIST_SUCCESS,
        items: items,
        currentPage: currentPage,
        total: total
    }
}

function studentListFailure(){
    return {
        type: AJAX_STUDENT_LIST_FAILURE
    }
}

export function getStudentList() {
    return (dispatch, getState) => {
        let { studentState } = getState();
        let currentPage = studentState.currentPage;
        if(currentPage){
            dispatch(studentListRequest());
            $.ajax({
                url: 'api/class.json',
                data: {
                    'currentPage': currentPage
                }
            }).done(function(data){
                if(data.status){
                    setTimeout(function(){
                        let { pageData, current, total } = data.data;
                        dispatch(studentListSuccess(pageData, current, total));
                    }, 1000);
                }
            }).fail(function(){
                dispatch(studentListFailure());
            });
        }
    }
}

export function changeStudentListPage(currentPage){
    return {
        type: CHANGE_STUDENT_LIST_PAGE,
        currentPage: currentPage,
    }
}