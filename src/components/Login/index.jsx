/**
 * Created by admini on 2016/10/13.
 */

import './style.scss';
import React from 'react';
import { connect } from 'react-redux';
import { changeName, changePassword, userLogin } from '../../actions/user.js';

import Loading from '../Loading/index.jsx';

class Login extends React.Component{
    render() {
        const { isFetching, name, password, handleNameChange, handlePasswordChange, handleUserLogin } = this.props;

        var img = require('../../images/slide.png');
        var style = {
            background:'url('+ img +') center 55px no-repeat'
        };

        return (
            <div className="login">
                <div className="logo"></div>
                <div className="main">
                    <div className="container">
                        <div className="left">
                            <div className="slide-container">
                                <ul className="slides">
                                    <li style={style}><h1>图表统计，直观分析</h1><h2>图表分析，走势对比优劣差距一目了然。</h2></li>
                                    <li style={style}><h1>图表统计，直观分析</h1><h2>图表分析，走势对比优劣差距一目了然。</h2></li>
                                    <li style={style}><h1>图表统计，直观分析</h1><h2>图表分析，走势对比优劣差距一目了然。</h2></li>
                                    <li style={style}><h1>图表统计，直观分析</h1><h2>图表分析，走势对比优劣差距一目了然。</h2></li>
                                </ul>
                                <ol className="slides-num">
                                    <li className="slides-active"/>
                                    <li/>
                                    <li/>
                                    <li/>
                                </ol>
                            </div>
                        </div>
                        <div className="right">
                            <p><input value={name} onChange={handleNameChange} type="text" placeholder="请输入您的账号" /></p>
                            <p><input value={password} onChange={handlePasswordChange} type="password" placeholder="请输入您的密码" /></p>
                            <div onClick={handleUserLogin} className="submit">登陆</div>
                            <p><a href="#">忘记密码？</a></p>
                        </div>
                        <div className="clearfix"></div>
                    </div>
                </div>
                <div className="footer">
                    <p><a href="#">关于数字化校园管理平台</a><a href="#">使用说明</a><a href="#">联系我们</a><a href="#">关于新课标</a> © 2015 All Rights Reserved By xinkb.org 新课标教育中心版权所有</p>
                </div>

                { isFetching ? <Loading /> : false }

            </div>
        );
    }
}

function mapStateToProps(state) {
    let { userState } = state;


    return {
        isFetching: userState.isFetching,
        name: userState.name,
        password: userState.password
    }
}

function mapDispatchToProps(dispatch) {
    return {
        handleNameChange: (e) => {
            let name = e.target.value;
            return (
                dispatch(changeName(name))
            )
        },
        handlePasswordChange: (e) => {
            let password = e.target.value;
            return (
                dispatch(changePassword(password))
            )
        },
        handleUserLogin: () => {
            dispatch(userLogin())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);