import './style.scss';
import React from 'react';

import { connect } from 'react-redux';
import { getTeacherList, changeTeacherListPage } from '../../actions/teacher.js';

import GlobalNav from '../GlobalNav/index.jsx';
import PageNav from '../PageNav/index.jsx';
import GlobalFooter from '../GlobalFooter/index.jsx';

import Loading from '../Loading/index.jsx';

class TeacherManage extends React.Component{
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        const { handleTeacherList } = this.props;
        handleTeacherList();
    }

    render() {
        const { isFetching, items, currentPage, total, handleCurrentPage } = this.props;

        let trStyle = {
            height: '40px',
            lineHeight: '40px',
            color: '#FFF',
            background: '#1199dd'
        };

        return (
            <div>
                <GlobalNav />

                <div className="global-container">

                    <div className="section">
                        <a id="add-teacher" className="top-btn" href="javascript:void(0);">新增教师</a>
                        <a className="top-btn" href="javascript:void(0);" id="import-teacher">批量导入教师<input className="upload" type="file" /></a>
                        <a href="#">模板下载</a>
                        <div className="top-search">
                            <select id="search-grade">
                                <option>年级</option>
                                <option>一年级</option>
                            </select>
                            <select id="search-class">
                                <option>班级</option>
                                <option>一班</option>
                            </select>
                            <input id="search-keyWords" type="text" placeholder="关键字搜索"/>
                                <a id="search-submit" href="#">筛选</a>
                        </div>
                        <div className="clearfix"></div>
                    </div>

                    <div className="section">
                        <table className="manage-table">
                            <thead>
                                <tr style={trStyle}>
                                    <td width="10%">序号</td>
                                    <td width="10%">姓名</td>
                                    <td width="15%">账号</td>
                                    <td width="35%">任教班级</td>
                                    <td width="10%">角色权限</td>
                                    <td>操作</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    items
                                    ?
                                    items.map(function (item) {
                                        return(
                                            <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td>标题标题</td>
                                                <td>320198271625671726</td>
                                                <td>五年级1班；五年级2班；五年级3班</td>
                                                <td>老师</td>
                                                <td><a href="javascript:void(0);">修改</a><a href="javascript:void(0);">重置密码</a></td>
                                            </tr>
                                        )
                                    })
                                    :
                                    <tr>
                                        <td colSpan="6">没有数据</td>
                                    </tr>
                                }
                            </tbody>
                        </table>

                        <PageNav current={currentPage} total={total} pageSize="5" handleCurrentPage={handleCurrentPage} />
                    </div>
                </div>

                <GlobalFooter />

                { isFetching ? <Loading /> : false }
            </div>
        );
    }
}

function mapStateToProps(state) {
    let { teacherState } = state;
    return {
        isFetching: teacherState.isFetching,
        items: teacherState.items,
        currentPage: teacherState.currentPage,
        total: teacherState.total
    }
}

function mapDispatchToProps(dispatch) {
    return {
        handleTeacherList: () => {
            dispatch(getTeacherList())
        },
        handleCurrentPage:(currentPage) => {
            dispatch(changeTeacherListPage(currentPage))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeacherManage);



