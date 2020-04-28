import React, {Component} from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import {Route} from "react-router-dom";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {

    state = {
        ingredients: {},
        price: 0
    };

    componentDidMount() {
        let ingredients = {}, price;
        const query = new URLSearchParams(this.props.location.search);
        for (let param of query.entries()) {
            const [key, value] = param;
            if (key === 'price') {
                price = value;
            } else {
                ingredients[key] = +value;
            }
        }
        this.setState({
            ingredients: ingredients,
            price: price
        })
    }

    onCancelClickedHandler = () => {
        this.props.history.goBack();
    };

    onContinueClickedHandler = () => {
        this.props.history.replace('/checkout/order');
    };

    render() {
        return (
            <div>
                <CheckoutSummary ingredients={this.state.ingredients}
                                 cancelClicked={this.onCancelClickedHandler}
                                 continueClicked={this.onContinueClickedHandler}/>
                <Route path={this.props.match.path + '/order'}
                       render={(props) => <ContactData ingredients={this.state.ingredients}
                                                       price={this.state.price}
                                                       {...props}/>}/>
            </div>
        );
    }
}

export default Checkout;