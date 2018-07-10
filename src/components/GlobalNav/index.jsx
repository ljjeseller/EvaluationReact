/**
 * Created by admini on 2016/10/14.
 */

import './style.scss';
import React from 'react';
import { connect } from 'react-redux';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import NavLink from '../NavLink/index.jsx';

import { userLogOut } from '../../actions/user.js';

class GlobalNav extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            userHover: false,
            open: false
        };
    }

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleMouseEnter = () => {
        this.setState({userHover: true});
    };

    handleMouseLeave = () => {
        this.setState({userHover: false});
    };

    render() {
        const { userName, handleLogOut } = this.props;

        const actions = [
            <FlatButton
                label="取消"
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="确认"
                primary={true}
                keyboardFocused={true}
                onTouchTap={handleLogOut}
            />,
        ];

        return (
            <div className="global-nav">
                <div className="container">
                    <div className="logo"></div>
                    <NavLink to="/Index" className="nav">班级设置</NavLink>
                    <NavLink to="/StudentManage" className="nav">学生管理</NavLink>
                    <NavLink to="/TeacherManage" className="nav">教师管理</NavLink>
                    <NavLink to="/Role" className="nav">角色权限</NavLink>
                    <NavLink to="/Statistic" className="nav">统计报表</NavLink>
                    <div className="user" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                        {
                            this.state.userHover
                            ?
                            <div className="hover"><a href="javascript:void(0);">修改密码</a><a onTouchTap={this.handleOpen} href="javascript:void(0);">退出登录</a></div>
                            :
                            <span className="name">{userName}<img src={require("../../images/arrow-white-bottom.png")} /></span>
                        }
                    </div>
                </div>

                <Dialog
                    title="提示"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    确认退出？
                </Dialog>
            </div>
        );
    }
}

function mapStateToProps() {
    let userName = localStorage.userName = "admin";
    return {
        userName: userName
    }
}

function mapDispatchToProps(dispatch) {
    return {
        handleLogOut: () => {
            dispatch(userLogOut())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GlobalNav);


