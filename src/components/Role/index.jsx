import './style.scss';
import React from 'react';

import { connect } from 'react-redux';
import { getRoleList, changeRoleListPage } from '../../actions/role.js';

import GlobalNav from '../GlobalNav/index.jsx';
import PageNav from '../PageNav/index.jsx';
import GlobalFooter from '../GlobalFooter/index.jsx';

import Loading from '../Loading/index.jsx';

class Role extends React.Component{
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        const { handleRoleList } = this.props;
        handleRoleList();
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
                        <a id="add-role" className="top-btn" href="javascript:void(0);">新增角色</a>
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
                                    <td width="10%">序号</td>
                                    <td width="10%">角色名</td>
                                    <td width="55%">访问权限</td>
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
                                                <td>五年级1班；五年级2班；五年级3班</td>
                                                <td><a href="javascript:void(0);">修改</a></td>
                                            </tr>
                                        )
                                    })
                                    :
                                    <tr>
                                        <td colSpan="4">没有数据</td>
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
    let { roleState } = state;
    return {
        isFetching: roleState.isFetching,
        items: roleState.items,
        currentPage: roleState.currentPage,
        total: roleState.total
    }
}

function mapDispatchToProps(dispatch) {
    return {
        handleRoleList: () => {
            dispatch(getRoleList())
        },
        handleCurrentPage:(currentPage) => {
            dispatch(changeRoleListPage(currentPage))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Role);



