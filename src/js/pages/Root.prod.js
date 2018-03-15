import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import {Redirect, Route, Switch} from 'react-router-dom';
import {ConnectedRouter} from 'react-router-redux';
import {IntlProvider} from 'react-intl-redux';
import {createMuiTheme, MuiThemeProvider} from 'material-ui/styles';
import style from '../../stylesheets/abstracts/_variables.scss';

// Page Components
import Routes from '../routes';
import Index from './index/Index';
// History
import history from "../store/history";


const theme = createMuiTheme({
  palette: {
    primary: {
      light: style.colorPrimaryLight,
      main: style.colorPrimary,
      dark: style.colorPrimaryDark,
      contrastText: style.textColorPrimary,
    },
    secondary: {
      light: style.colorSecondaryLight,
      main: style.colorSecondary,
      dark: style.colorSecondaryDark,
      contrastText: style.textColorSecondary,
    },
    text: {
      primary: style.textColorPrimary,
      secondary: style.textColorSecondary,
      disabled: style.textColorDisabled,
      hint: style.textColorHint,
      error: style.textColorError
    }
  },
  typography: {
    // Others if we want:
    // https://material-ui-next.com/customization/default-theme/
    headline: {
      fontSize: style.textSizeXL,
      fontWeight: 400,
      fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      lineHeight: "1.35417em",
      color: style.textColorPrimary
    },
    title: {
      fontSize: style.textSizeL,
      fontWeight: 500,
      fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      lineHeight: "1.16667em",
      color: style.textColorPrimary
    },
    subheading: {
      fontSize: style.textSizeMD,
      fontWeight: 400,
      fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      lineHeight: "1.5em",
      color: style.textColorSecondary

    },
    body2: {
      fontSize: style.textSizeSM,
      fontWeight: 500,
      fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      lineHeight: "1.7em",
      color: style.textColorPrimary

    },
    body1: {
      fontSize: style.textSizeSM,
      fontWeight: 400,
      fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
      lineHeight: "1.4em",
      color: style.textColorPrimary
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
