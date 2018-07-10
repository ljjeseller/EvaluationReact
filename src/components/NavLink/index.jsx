/**
 * Created by admini on 2016/10/14.
 */

import React from 'react'
import { Link } from 'react-router'

export default React.createClass({
    render() {
        return <Link {...this.props} activeClassName="current"/>
    }
})