/**
 * Created by admini on 2016/10/19.
 */

import { AJAX_ROLE_LIST_REQUEST, AJAX_ROLE_LIST_SUCCESS, AJAX_ROLE_LIST_FAILURE, CHANGE_ROLE_LIST_PAGE } from '../constants/index.js';
import $ from 'jquery';

function roleListRequest(){
    return {
        type: AJAX_ROLE_LIST_REQUEST
    }
}

function roleListSuccess(items, currentPage, total){
    return {
        type: AJAX_ROLE_LIST_SUCCESS,
        items: items,
        currentPage: currentPage,
        total: total
    }
}

function roleListFailure(){
    return {
        type: AJAX_ROLE_LIST_FAILURE
    }
}

export function getRoleList() {
    return (dispatch, getState) => {
        let { studentState } = getState();
        let currentPage = studentState.currentPage;
        if(currentPage){
            dispatch(roleListRequest());
            $.ajax({
                url: 'api/class.json',
                data: {
                    'currentPage': currentPage
                }
            }).done(function(data){
                if(data.status){
                    setTimeout(function(){
                        let { pageData, current, total } = data.data;
                        dispatch(roleListSuccess(pageData, current, total));
                    }, 500);
                }
            }).fail(function(){
                dispatch(roleListFailure());
            });
        }
    }
}

export function changeRoleListPage(currentPage){
    return {
        type: CHANGE_ROLE_LIST_PAGE,
        currentPage: currentPage,
    }
}