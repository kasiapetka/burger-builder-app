import React, {Component} from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import {Route} from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import {connect} from "react-redux";

class Checkout extends Component {

    onCancelClickedHandler = () => {
        this.props.history.goBack();
    };

    onContinueClickedHandler = () => {
        this.props.history.replace('/checkout/order');
    };

    render() {
        return (
            <div>
                <CheckoutSummary ingredients={this.props.ingredients}
                                 cancelClicked={this.onCancelClickedHandler}
                                 continueClicked={this.onContinueClickedHandler}/>
                <Route path={this.props.match.path + '/order'}
                       component={ContactData}/>
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return{
        ingredients: state.ingr.ingredients
    };
};

export default  connect(mapStateToProps)(Checkout);