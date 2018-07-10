import './style.scss';
import React from 'react';

import { connect } from 'react-redux';
import { getStudentList, changeStudentListPage } from '../../actions/student.js';

import GlobalNav from '../GlobalNav/index.jsx';
import PageNav from '../PageNav/index.jsx';
import GlobalFooter from '../GlobalFooter/index.jsx';

import Loading from '../Loading/index.jsx';

class StudentManage extends React.Component{
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        const { handleClassList } = this.props;
        handleClassList();
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
                        <a id="add-student" className="top-btn" href="javascript:void(0);">新增学生</a>
                        <a className="top-btn" href="javascript:void(0);" id="import-student">批量导入学生<input className="upload" type="file" /></a>
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
                                    <td width="10%">年级</td>
                                    <td width="10%">班级</td>
                                    <td width="5%">学号</td>
                                    <td width="10%">评价得分</td>
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
                                                <td>阿斯顿</td>
                                                <td>11111</td>
                                                <td>2222</td>
                                                <td>999</td>
                                                <td><a className="check-score" href="javascript:void(0);">99999</a></td>
                                                <td><a href="javascript:void(0);">修改</a><a href="javascript:void(0);">重置密码</a></td>
                                            </tr>
                                        )
                                    })
                                    :
                                    <tr>
                                        <td colSpan="8">没有数据</td>
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
    let { studentState } = state;
    return {
        isFetching: studentState.isFetching,
        items: studentState.items,
        currentPage: studentState.currentPage,
        total: studentState.total
    }
}

function mapDispatchToProps(dispatch) {
    return {
        handleClassList: () => {
            dispatch(getStudentList())
        },
        handleCurrentPage:(currentPage) => {
            dispatch(changeStudentListPage(currentPage))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentManage);



