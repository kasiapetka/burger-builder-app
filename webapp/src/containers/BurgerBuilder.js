import React, {Component} from "react";
import Auxiliary from "../hoc/Auxiliary";
import Burger from '../components/Burger/Burger'
import BuildControls from "../components/Burger/BuildControls/BuildControls";
import Modal from "../components/UI/Modal/Modal";
import OrderSummary from "../components/Burger/OrderSummary/OrderSummary";
import axios from './../axiosOrders'
import Spinner from "../components/UI/Spinner/Spinner";
import withErrorHandler from "../hoc/withErrorHandler/withErrorHandler";
import * as actionTypes from "../store/actions";
import {connect} from "react-redux";

class BurgerBuilder extends Component {
    state = {

        purchasable: false,
        showModal: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        // axios.get('https://burger-builder-react-95245.firebaseio.com/ingredients.json')
        //     .then(response => {
        //             const ingredients = response.data;
        //             this.setState({
        //                 ingredients: ingredients
        //             })
        //         }
        //     ).catch(error => {
        //     this.setState({
        //         error: true
        //     })
        // })
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
        const sum = Object.keys(ingredients).map(igKey=>{
            return ingredients[igKey];
        }).reduce((sum,el)=>{
          return sum + el;
        },0);
       return sum > 0;
    };

    showModalHandler = () => {
        this.setState((prevState) => {
            return {
                showModal: !this.state.showModal
            }
        });
    };

    purchaseContinueHandler = () => {

        const queryParams = [];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' +
                encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price='+this.state.totalPrice);
        const queryString = queryParams.join('&');

        this.props.history.push({
                pathname: '/checkout',
                search: '?'+ queryString
        })
    };

    render() {
        let orderSummary = null;
        const disabledInfo = {
            ...this.props.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let burger = this.state.error ? <p>Ingredients cant be loaded :(</p> : <Spinner/>;

        if (this.props.ingredients) {
            burger = (
                <React.Fragment>
                    <Burger
                        ingredients={this.props.ingredients}/>
                    <BuildControls
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

        if (this.state.loading) {
            orderSummary = (<Spinner/>)
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

const mapStateToProps = state =>{
    return{
        ingredients: state.ingr.ingredients,
        totalPrice: state.ingr.totalPrice,
    };
};


const mapDispatchToProps = dispatch =>{
    return{
        onAddIngredient: (ingredientName)=> dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingredientName}),
        onRemoveIngredient: (ingredientName)=> dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingredientName})
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));