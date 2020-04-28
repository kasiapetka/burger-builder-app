import React, {Component} from 'react';
import Layout from "./containers/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Orders from "./containers/Orders/Orders";


class App extends Component {

    render() {
        return (
            <Router>
                <Layout>
                    <Switch>
                        <Route path='/orders' component={Orders}/>
                        <Route path='/checkout' component={Checkout}/>
                        <Route path='/' component={BurgerBuilder}/>
                    </Switch>
                </Layout>
            </Router>
        );
    }

}

export default App;
