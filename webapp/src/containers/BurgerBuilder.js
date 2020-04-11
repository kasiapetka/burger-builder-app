import React, {Component} from "react";
import Auxiliary from "../hoc/Auxiliary";
import Burger from '../components/Burger/Burger'
import BuildControls from "../components/Burger/BuildControls/BuildControls";

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
                salad:0
            },
            totalPrice: 4
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
            })
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
            })
        };

    render() {
        return (
            <Auxiliary>
                <p>ewerwerewr price : {this.state.totalPrice}</p>
                <Burger
                ingredients={this.state.ingredients}/>
                <BuildControls
                ingredientAdded = {this.addIngredientHandler}
                ingredientRemoved = {this.removeIngredientHandler}/>
            </Auxiliary>
        );
    }
}

export default BurgerBuilder;