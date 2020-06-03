import React, {Component} from "react";
import Auxiliary from "../hoc/Auxiliary";
import Burger from '../components/Burger/Burger'
import BuildControls from "../components/Burger/BuildControls/BuildControls";
import Modal from "../components/UI/Modal/Modal";
import OrderSummary from "../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../components/UI/Spinner/Spinner";
import withErrorHandler from "../hoc/withErrorHandler/withErrorHandler";
import {connect} from "react-redux";
import axios from '../axiosOrders';
import * as actionCreators from "../store/actions";

class BurgerBuilder extends Component {
    state = {
        purchasable: false,
        showModal: false,
    };

    componentDidMount() {
        this.props.onFetchIngredients();
    }

    // addIngredientHandler = (type) => {
    //     const updatedCount = this.state.ingredients[type] + 1;
    //     const updatedIngredients = {...this.state.ingredients};
    //     updatedIngredients[type] = updatedCount;
    //     const priceAdd = ingredientPrices[type];
    //     const newPrice = this.state.totalPrice + priceAdd;
    //
    //     this.setState({
    //         ingredients: updatedIngredients,
    //         totalPrice: newPrice
    //     });
    //
    //     this.updatePurchaseState(newPrice);
    // };
    //
    // removeIngredientHandler = (type) => {
    //     let updatedCount = this.state.ingredients[type] - 1;
    //     let newPrice = this.state.totalPrice;
    //     const priceRemove = ingredientPrices[type];
    //
    //     if (updatedCount >= 0)
    //         newPrice = newPrice - priceRemove;
    //
    //     if (updatedCount <= 0)
    //         updatedCount = 0;
    //
    //     const updatedIngredients = {...this.state.ingredients};
    //     updatedIngredients[type] = updatedCount;
    //     this.setState({
    //         ingredients: updatedIngredients,
    //         totalPrice: newPrice
    //     });
    //
    //     this.updatePurchaseState(newPrice);
    // };

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);
        return sum > 0;
    };

    showModalHandler = () => {
        if(this.props.isAuth){
            this.setState((prevState) => {
                return {
                    showModal: !prevState.showModal
                }
            });
        }else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/login')
        }
    };

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout')
    };

    render() {
        let orderSummary = null;
        const disabledInfo = {
            ...this.props.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let burger = this.props.error ? <p>Ingredients cant be loaded :(</p> : <Spinner/>;

        if (this.props.ingredients) {
            burger = (
                <React.Fragment>
                    <Burger
                        ingredients={this.props.ingredients}/>
                    <BuildControls
                        isAuth={this.props.isAuth}
                        ingredientAdded={this.props.onAddIngredient}
                        ingredientRemoved={this.props.onRemoveIngredient}
                        disabled={disabledInfo}
                        price={this.props.totalPrice.toFixed(2)}
                        purchasable={this.updatePurchaseState(this.props.ingredients)}
                        showModal={this.showModalHandler}/>
                </React.Fragment>);

            orderSummary = (<OrderSummary
                ingredients={this.props.ingredients}
                cancel={this.showModalHandler}
                continue={this.purchaseContinueHandler}
                price={this.props.totalPrice.toFixed(2)}/>)
        }
        return (
            <Auxiliary>
                <Modal
                    show={this.state.showModal}
                    modalClosed={this.showModalHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingr.ingredients,
        totalPrice: state.ingr.totalPrice,
        error: state.ingr.error,
        isAuth: state.auth.token !== null
    };
};


const mapDispatchToProps = dispatch => {
    return {
        onFetchIngredients: () => dispatch(actionCreators.fetchIngredients()),
        onAddIngredient: (ingredientName) => dispatch(actionCreators.addIngredient(ingredientName)),
        onRemoveIngredient: (ingredientName) => dispatch(actionCreators.removeIngredient(ingredientName)),
        onInitPurchase: () => dispatch(actionCreators.purchaseInit()),
        onSetAuthRedirectPath: (path)=>dispatch(actionCreators.setAuthRedirectPath(path))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));