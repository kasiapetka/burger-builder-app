import React, {Component} from 'react';
import Layout from "./containers/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import {connect} from "react-redux";
import * as actions from './store/actions'

class App extends Component {

    componentDidMount() {
        this.props.onTryAutoSignUp();
    }

    render() {
        let routes =(
            <Switch>
                <Route path='/login' component={Auth}/>
                <Route path='/' component={BurgerBuilder}/>
            </Switch>
        );

        if(this.props.isAuth){
            routes =(
                <Switch>
                    <Route path='/orders' component={Orders}/>
                    <Route path='/checkout' component={Checkout}/>
                    <Route path='/logout' component={Logout}/>
                    <Route path='/' component={BurgerBuilder}/>
                </Switch>
            );
        }

        return (
            <Router>
                <Layout>
                    {routes}
                </Layout>
            </Router>
        );
    }

}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignUp: () => dispatch(actions.authCheckState())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
