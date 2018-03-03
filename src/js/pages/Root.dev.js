import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import {Redirect, Route, Switch} from 'react-router-dom';
import {ConnectedRouter} from 'react-router-redux';
import {IntlProvider} from 'react-intl-redux';
import {createMuiTheme, MuiThemeProvider} from 'material-ui/styles';
import DevTools from './index/dev/DevTools';

// Page Components
import Routes from '../routes';
import Index from './index/Index';
// History
import history from "../store/history";


const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#757ce8',
            main: '#3f50b5',
            dark: '#002884',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
        },
    },
});

class Root extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <Provider store={this.props.store}>
                <MuiThemeProvider theme={theme}>
                    <IntlProvider locale="en">
                        <ConnectedRouter history={history.history}>
                            <Index>
                                <Routes/>
                                <DevTools/>
                            </Index>
                        </ConnectedRouter>
                    </IntlProvider>
                </MuiThemeProvider>
            </Provider>
        );
    }
}

Root.propTypes = {
    store: PropTypes.object.isRequired
};

export default Root
