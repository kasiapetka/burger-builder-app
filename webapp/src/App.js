import React, {Component} from 'react';
import Layout from "./containers/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Logout from "./containers/Auth/Logout/Logout";
import {connect} from "react-redux";
import * as actions from './store/actions'
import asyncComponent from "./hoc/asyncComponent/asyncComponent";

const asyncCheckOut = asyncComponent(()=>{
   return import("./containers/Checkout/Checkout");
});
const asyncOrders = asyncComponent(()=>{
    return import("./containers/Orders/Orders");
});
const asyncAuth = asyncComponent(()=>{
    return import("./containers/Auth/Auth");
});


class App extends Component {

    componentDidMount() {
        this.props.onTryAutoSignUp();
    }

    render() {
        let routes =(
            <Switch>
                <Route path='/login' component={asyncAuth}/>
                <Route path='/' component={BurgerBuilder}/>
            </Switch>
        );

        if(this.props.isAuth){
            routes =(
                <Switch>
                    <Route path='/orders' component={asyncOrders}/>
                    <Route path='/login' component={asyncAuth}/>
                    <Route path='/checkout' component={asyncCheckOut}/>
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
