import React, {Component} from 'react';
import Layout from "./containers/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";


class App extends Component {

    render() {
        return (
            <Layout>
                <Router>
                    <Switch>
                    <Route path='/checkout' component={Checkout}/>
                    <Route path='/' component={BurgerBuilder}/>
                    </Switch>
                </Router>
            </Layout>
        );
    }

}

export default App;
