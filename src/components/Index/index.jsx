import './style.scss';
import React from 'react';

import { connect } from 'react-redux';
import { getClassList, changeClassListPage } from '../../actions/class.js';

import GlobalNav from '../GlobalNav/index.jsx';
import PageNav from '../PageNav/index.jsx';
import GlobalFooter from '../GlobalFooter/index.jsx';

import Loading from '../Loading/index.jsx';

class Index extends React.Component{
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        const { receivedAt, handleClassList } = this.props;
        let timestampNow = Date.now();
        let diff = timestampNow - receivedAt;
        if( diff > 10 * 1000 ){
            handleClassList();
        }
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
                        <a id="add-evaluation" className="top-btn" href="javascript:void(0);">新增指标</a>
                        <a className="top-btn" href="javascript:void(0);" id="import-teacher">导入指标<input className="upload" type="file" /></a>
                        <a href="#">模板下载</a>
                        <div className="top-search">
                            <input id="search-keyWords" type="text" placeholder="关键字搜索" />
                                <a id="search-submit" href="#">筛选</a>
                        </div>
                        <div className="clearfix"></div>
                    </div>

                    <div className="section">
                        <table className="manage-table">
                            <thead>
                                <tr style={trStyle}>
                                    <td width="5%">序号</td>
                                    <td width="10%">年级</td>
                                    <td width="10%">学科</td>
                                    <td width="20%">类型</td>
                                    <td width="30%">详细指标</td>
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
                                                <td>五年级</td>
                                                <td>数学</td>
                                                <td>第一学期十以内数的认识</td>
                                                <td>上课习惯；课间习惯；课后习惯</td>
                                                <td><a href="javascript:void(0);">修改</a></td>
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
    let { classState } = state;
    return {
        isFetching: classState.isFetching,
        items: classState.items,
        currentPage: classState.currentPage,
        total: classState.total,
        receivedAt: classState.receivedAt
    }
}

function mapDispatchToProps(dispatch) {
    return {
        handleClassList: () => {
            dispatch(getClassList())
        },
        handleCurrentPage:(currentPage) => {
            dispatch(changeClassListPage(currentPage))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);



