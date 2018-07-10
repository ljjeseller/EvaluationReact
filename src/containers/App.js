/**
 * Created by admini on 2016/10/24.
 */

import '../css/initialize.css';
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class App extends React.Component{
    render() {
        const muiTheme = getMuiTheme({
            fontFamily: 'Microsoft YaHei, sans-serif'
        });

        return (
            <div>
                <MuiThemeProvider muiTheme={muiTheme}>
                    {this.props.children}
                </MuiThemeProvider>
            </div>
        );
    }
}

export default App