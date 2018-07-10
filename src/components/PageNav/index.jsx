/**
 * Created by admini on 2016/10/14.
 */

import './style.scss';
import React from 'react';

class PageNav extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            page: ""
        }
    }

    handleChange = (e) => {
        this.setState({page : e.target.value})
    };

    handleJumpPage = () => {
        let page = this.state.page;

        let total = this.props.total;
        let pageSize = this.props.pageSize;
        let pages = Math.ceil( total/pageSize );
        let handleCurrentPage = this.props.handleCurrentPage;

        if(!/^[1-9]\d*$/.test(page)){
            alert('页码只能输入大于1的正整数');
        }else if(parseInt(page) > pages){
            alert('没有这么多页');
        }else{
            handleCurrentPage(page);
        }
    };

    render() {
        let current = this.props.current;
        let total = this.props.total;
        let pageSize = this.props.pageSize;
        let handleCurrentPage = this.props.handleCurrentPage;

        let pages = Math.ceil( total/pageSize );
        let begin;
        let len;
        let items = [];

        if(pages > 5){
            len = 5;
            if(current >= (pages-2)){
                begin = pages - 4;
            }else if(current <= 3){
                begin = 1;
            }else{
                begin = current - 2;
            }
        }else{
            len = pages;
            begin = 1;
        }

        for(let i = 0; i < len; i++){
            let showI = begin + i;
            if(current == showI){
                items.push({num : showI, cur : true});
            }else{
                items.push({num : showI, cur : false});
            }
        }

        return (
            <div className="page-nav">
                <div className="left">
                    {
                        current == 1 ? false : <a onClick={(currentPage) => handleCurrentPage(current - 1)} href="javascript:void(0);">上一页</a>
                    }
                    {
                        items.map(function(item){
                            return <a onClick={(currentPage) => handleCurrentPage(item.num)}  key={item.num} className={item.cur ? 'current' : ''} href="javascript:void(0);">{item.num}</a>
                        })
                    }
                    {
                        current == pages ? false : <a onClick={(currentPage) => handleCurrentPage(current + 1)} href="javascript:void(0);">下一页</a>
                    }
                </div>
                <div className="right">共{pages}页
                    <input value={this.state.page} onChange={this.handleChange}  type="text" placeholder="跳转页码" />
                    <a onClick={this.handleJumpPage} href="javascript:void(0);">GO</a>
                </div>
                <div className="clearfix"></div>
            </div>
        );
    }
}

export default PageNav;


