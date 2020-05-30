import React, {Component} from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import {Redirect, Route} from "react-router-dom";
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
        let summary = <Redirect to='/'/>;
        if (this.props.ingredients) {
            const purchasedRedirect = this.props.purchased ? <Redirect to='/'/> : null;

            summary = <div>
                {purchasedRedirect}
                <CheckoutSummary ingredients={this.props.ingredients}
                                 cancelClicked={this.onCancelClickedHandler}
                                 continueClicked={this.onContinueClickedHandler}/>
                <Route path={this.props.match.path + '/order'}
                       component={ContactData}/>
            </div>
        }

        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingr.ingredients,
        purchased: state.order.purchased
    };
};

export default connect(mapStateToProps)(Checkout);