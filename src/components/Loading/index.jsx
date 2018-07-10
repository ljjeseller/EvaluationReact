/**
 * Created by admini on 2016/10/14.
 */

import React from 'react'
import CircularProgress from 'material-ui/CircularProgress';

export default React.createClass({
    render() {
        let style = {
            position: "fixed",
            left:0,
            top:0,
            right:0,
            bottom:0,
            zIndex: 99999,
            background: "rgba(0,0,0,0.5)"
        };

        let innerStyle = {
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop:"-40px",
            marginLeft:"-40px"
        };

        return (
            <div style={style}>
                <CircularProgress style={innerStyle} size={80} thickness={7} />
            </div>
        )
    }
})