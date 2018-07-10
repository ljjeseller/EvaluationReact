import './style.scss';
import React from 'react';

import { connect } from 'react-redux';
import { getRoleList, changeRoleListPage } from '../../actions/role.js';

import GlobalNav from '../GlobalNav/index.jsx';
import GlobalFooter from '../GlobalFooter/index.jsx';
import DatePicker from 'material-ui/DatePicker';
import Loading from '../Loading/index.jsx';

import ReactHighcharts from 'react-highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
HighchartsMore(ReactHighcharts.Highcharts);

class Statistic extends React.Component{
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        const { handleRoleList } = this.props;
        //handleRoleList();
    }

    render() {
        const { isFetching, items, currentPage, total, handleCurrentPage } = this.props;

        let timeStyle = {
            display: 'inline-block'
        };

        let textFieldStyle = {
            width: '150px'
        };


        const config = {
            chart: {
                polar: true,
                type: 'area'
            },
            title: {
                text: ''
            },
            pane: {
                size: '80%'
            },
            xAxis: {
                categories: ['Sales', 'Marketing', 'Development', 'Customer Support',
                    'Information Technology', 'Administration'],
                tickmarkPlacement: 'on',
                lineWidth: 0
            },
            yAxis: {
                gridLineInterpolation: 'polygon',
                lineWidth: 0,
                min: 0
            },
            tooltip: {
                shared: true,
                pointFormat: '<span style="color:{series.color}">{series.name}: <b>${point.y:,.0f}</b><br/>'
            },
            legend: {
                enabled : false
            },
            credits : {
                enabled : false
            },
            series: [{
                name: 'Allocated Budget',
                data: [4300, 1900, 6000, 3500, 1700, 1000],
                pointPlacement: 'on',
                fillColor: 'rgba(0, 153, 255, 0.2)'
            }]
        };

        return (
            <div>
                <GlobalNav />

                <div className="statistic-nav">
                    <div className="container">
                        <a className="nav current" href="javascript:void(0);">得分排名</a>
                        <a className="nav" href="javascript:void(0);">得分走势</a>
                        <a className="nav" href="javascript:void(0);">指标分布</a>
                        <a className="nav" href="javascript:void(0);">班级对比</a>
                        <a className="nav" href="javascript:void(0);">得分比例</a>
                    </div>
                </div>

                <div className="global-container">
                    <div className="section statistic-container">
                        <div className="search">
                            <select id="search-grade">
                                <option>一年级</option>
                                <option>一年级</option>
                            </select>
                            <select id="search-grade">
                                <option>班级</option>
                                <option>一年级</option>
                            </select>
                            <select id="search-grade">
                                <option>指标类型</option>
                                <option>指标类型</option>
                            </select>
                            <DatePicker hintText="Choose Time" mode="landscape" style={timeStyle} textFieldStyle={textFieldStyle} /> 至 <DatePicker hintText="Choose Time" mode="landscape" style={timeStyle} textFieldStyle={textFieldStyle} />
                            <a id="search-submit" href="javascript:void(0);">筛选</a>
                        </div>

                        <div className="index-distribution">
                            <div className="chart" id="indexDistribution">
                                <ReactHighcharts config = {config} domProps = {{id: 'indexDistribution'}} />
                            </div>
                            <div className="info">
                                <a className="current" href="javascript:void(0);">全班平均</a>
                                <a href="javascript:void(0);">学生姓名</a>
                                <a href="javascript:void(0);">学生姓名</a>
                                <a href="javascript:void(0);">学生名</a>
                                <a href="javascript:void(0);">学生姓名</a>
                                <a href="javascript:void(0);">姓名</a>
                                <a href="javascript:void(0);">学生名</a>
                                <a href="javascript:void(0);">学生姓名</a>
                                <a href="javascript:void(0);">学名</a>
                                <a href="javascript:void(0);">学生姓名</a>
                                <a href="javascript:void(0);">学生名</a>
                                <a href="javascript:void(0);">学生姓名</a>
                                <a href="javascript:void(0);">学生名</a>
                            </div>
                            <div className="clearfix"></div>
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Statistic);



