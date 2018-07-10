/**
 * Created by admini on 2016/10/11.
 */

import React from 'react'
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './reducers/index.js';
import App from './containers/App';
import Login from './components/Login/index.jsx';
import Index from './components/Index/index.jsx';
import StudentManage from './components/StudentManage/index.jsx';
import TeacherManage from './components/TeacherManage/index.jsx';
import Role from './components/Role/index.jsx';
import Statistic from './components/Statistic/index.jsx';
import createLogger from 'redux-logger';

const logger = createLogger();
const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}

const store = createStore(reducers, applyMiddleware(thunk, ...middlewares));

const checkLogin = () => {
    let token = localStorage.token;
    let userName = localStorage.userName;
    if(token && userName){
        return false;
    }else{
        browserHistory.push('/');
    }
};

ReactDOM.render((
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Login}/>
                <Route path="/Index" component={Index} onEnter={checkLogin}/>
                <Route path="/StudentManage" component={StudentManage} onEnter={checkLogin}/>
                <Route path="/TeacherManage" component={TeacherManage} onEnter={checkLogin}/>
                <Route path="/Role" component={Role} onEnter={checkLogin}/>
                <Route path="/Statistic" component={Statistic} onEnter={checkLogin}/>
            </Route>
        </Router>
    </Provider>
), document.getElementById('app'));