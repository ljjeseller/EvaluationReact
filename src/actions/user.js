/**
 * Created by admini on 2016/10/19.
 */

import { CHANGE_NAME, CHANGE_PASSWORD, AJAX_LOGIN_REQUEST, AJAX_LOGIN_SUCCESS, AJAX_LOGIN_FAILURE, LOG_OUT } from '../constants/index.js';
import $ from 'jquery';
import { browserHistory } from 'react-router';

export function changeName(name) {
    return {
        type: CHANGE_NAME,
        newName: name
    }
}

export function changePassword(password) {
    return {
        type: CHANGE_PASSWORD,
        newPassword: password
    }
}

function loginRequest(){
    return {
        type: AJAX_LOGIN_REQUEST
    }
}

function loginSuccess(){
    return {
        type: AJAX_LOGIN_SUCCESS
    }
}

function loginFailure(){
    return {
        type: AJAX_LOGIN_FAILURE
    }
}

export function userLogin() {
    return (dispatch, getState) => {
        let { userState } = getState();
        let name = userState.name.trim();
        let password = userState.password.trim();
        if(name && password){
            dispatch(loginRequest());
            $.ajax({
                url: 'api/ajax.json',
                data: {
                    'name': name,
                    'password': password
                }
            }).done(function(data){
                if(data.status){
                    setTimeout(function(){
                        localStorage.token = "123456";
                        localStorage.userName = "admin";
                        dispatch(loginSuccess());
                        browserHistory.push('/Index')
                    }, 1000);
                }
            }).fail(function(){
                dispatch(loginFailure());
            });
        }
    }
}

function logOut(){
    return {
        type: LOG_OUT,
    }
}

export function userLogOut() {
    return (dispatch) => {
        localStorage.token = "";
        localStorage.userName = "";
        dispatch(logOut());
        browserHistory.push('/');
    }
}