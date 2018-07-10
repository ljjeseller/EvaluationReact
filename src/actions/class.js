/**
 * Created by admini on 2016/10/19.
 */

import { AJAX_CLASS_LIST_REQUEST, AJAX_CLASS_LIST_SUCCESS, AJAX_CLASS_LIST_FAILURE, CHANGE_CLASS_LIST_PAGE } from '../constants/index.js';
import $ from 'jquery';

function classListRequest(){
    return {
        type: AJAX_CLASS_LIST_REQUEST
    }
}

function classListSuccess(items, currentPage, total){
    return {
        type: AJAX_CLASS_LIST_SUCCESS,
        items: items,
        currentPage: currentPage,
        total: total
    }
}

function classListFailure(){
    return {
        type: AJAX_CLASS_LIST_FAILURE
    }
}

export function getClassList() {
    return (dispatch, getState) => {
        let { classState } = getState();
        let currentPage = classState.currentPage;
        if(currentPage){
            dispatch(classListRequest());
            $.ajax({
                url: 'api/class.json',
                data: {
                    'currentPage': currentPage
                }
            }).done(function(data){
                if(data.status){
                    setTimeout(function(){
                        let { pageData, current, total } = data.data;
                        dispatch(classListSuccess(pageData, current, total));
                    }, 1000);
                }
            }).fail(function(){
                dispatch(classListFailure());
            });
        }
    }
}

export function changeClassListPage(currentPage){
    return {
        type: CHANGE_CLASS_LIST_PAGE,
        currentPage: currentPage,
    }
}