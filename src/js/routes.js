import React, {Component} from 'react';

import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import home from "./pages/home";
import {connect} from 'react-redux';

class Routes extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Switch>
                <Route path="/home" component={home.components.HomePage}/>
                <Redirect exact from="/" to="/home" />
            </Switch>
        )
    }
};

const mapStateToProps = state => {
    return {
        location: state.router.location
    }
};

export default connect(mapStateToProps)(Routes);