import React, {Component} from "react";
import Auxiliary from "../hoc/Auxiliary";
import Burger from '../components/Burger/Burger'
import BuildControls from "../components/Burger/BuildControls/BuildControls";
import Modal from "../components/UI/Modal/Modal";
import OrderSummary from "../components/Burger/OrderSummary/OrderSummary";

const ingredientPrices ={
    cheese: 1,
    meat: 2,
    bacon:1.5,
    salad: 1
};

class BurgerBuilder extends Component {
        state = {
            ingredients: {
                cheese: 0,
                meat: 0,
                bacon:0,
                salad:0,
            },
            totalPrice: 4,
            purchasable: false,
            showModal: false
        };

        addIngredientHandler=(type)=>{
            const updatedCount = this.state.ingredients[type] + 1;
            const updatedIngredients = {...this.state.ingredients};
            updatedIngredients[type] = updatedCount;
            const priceAdd = ingredientPrices[type];
            const newPrice = this.state.totalPrice + priceAdd;

            this.setState({
                ingredients: updatedIngredients,
                totalPrice: newPrice
            });

            this.updatePurchaseState(newPrice);
        };

        removeIngredientHandler=(type)=>{
            let updatedCount = this.state.ingredients[type] - 1;
            let newPrice=this.state.totalPrice;
            const priceRemove = ingredientPrices[type];

            if(updatedCount>=0)
                newPrice = newPrice - priceRemove;

            if(updatedCount <=0)
                updatedCount = 0;

            const updatedIngredients = {...this.state.ingredients};
            updatedIngredients[type] = updatedCount;
            this.setState({
                ingredients: updatedIngredients,
                totalPrice: newPrice
            });

            this.updatePurchaseState(newPrice);
        };

        updatePurchaseState=(newPrice)=> {
               this.setState({
                purchasable: newPrice > 4
            })

        };

        showModalHandler=()=>{
            this.setState((prevState)=>{
                return {
                    showModal: !this.state.showModal
                }
            });
        };

        purchaseContinueHandler=()=>{
            alert('You bought a burger');
        };

    render() {
        const disabledInfo ={
            ...this.state.ingredients
        };

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (
            <Auxiliary>
                <Modal
                    show={this.state.showModal}
                    modalClosed={this.showModalHandler}>
                    <OrderSummary
                    ingredients={this.state.ingredients}
                    cancel={this.showModalHandler}
                    continue={this.purchaseContinueHandler}
                    price={this.state.totalPrice.toFixed(2)}/>
                </Modal>

                <Burger
                ingredients={this.state.ingredients}/>
                <BuildControls
                ingredientAdded = {this.addIngredientHandler}
                ingredientRemoved = {this.removeIngredientHandler}
                disabled={disabledInfo}
                price={this.state.totalPrice.toFixed(2)}
                purchasable={this.state.purchasable}
                showModal={this.showModalHandler}/>
            </Auxiliary>
        );
    }
}

export default BurgerBuilder;