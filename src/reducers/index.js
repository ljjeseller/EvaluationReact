/**
 * Created by admini on 2016/10/18.
 */

import { combineReducers } from 'redux';

import userState from './user.js';
import classState from './class.js';
import studentState from './student.js';
import teacherState from './teacher.js';
import roleState from './role.js';

export default combineReducers({
    userState,
    classState,
    studentState,
    teacherState,
    roleState
})