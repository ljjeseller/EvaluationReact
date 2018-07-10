/**
 * Created by admini on 2016/10/14.
 */

import './style.scss';
import React from 'react';

class GlobalFooter extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="global-footer">&copy;2016 上海晓信信息科技版权所有</div>
        );
    }
}

export default GlobalFooter;


