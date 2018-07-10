/**
 * Created by admini on 2016/10/19.
 */

import { AJAX_TEACHER_LIST_REQUEST, AJAX_TEACHER_LIST_SUCCESS, AJAX_TEACHER_LIST_FAILURE, CHANGE_TEACHER_LIST_PAGE } from '../constants/index.js';
import $ from 'jquery';

function teacherListRequest(){
    return {
        type: AJAX_TEACHER_LIST_REQUEST
    }
}

function teacherListSuccess(items, currentPage, total){
    return {
        type: AJAX_TEACHER_LIST_SUCCESS,
        items: items,
        currentPage: currentPage,
        total: total
    }
}

function teacherListFailure(){
    return {
        type: AJAX_TEACHER_LIST_FAILURE
    }
}

export function getTeacherList() {
    return (dispatch, getState) => {
        let { studentState } = getState();
        let currentPage = studentState.currentPage;
        if(currentPage){
            dispatch(teacherListRequest());
            $.ajax({
                url: 'api/class.json',
                data: {
                    'currentPage': currentPage
                }
            }).done(function(data){
                if(data.status){
                    setTimeout(function(){
                        let { pageData, current, total } = data.data;
                        dispatch(teacherListSuccess(pageData, current, total));
                    }, 500);
                }
            }).fail(function(){
                dispatch(teacherListFailure());
            });
        }
    }
}

export function changeTeacherListPage(currentPage){
    return {
        type: CHANGE_TEACHER_LIST_PAGE,
        currentPage: currentPage,
    }
}