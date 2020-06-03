import * as actionTypes from '../actions/actionTypes'
import {updateObject} from '../utility'

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
};

const INGREDIENT_PRICES = {
    cheese: 1,
    meat: 2,
    bacon: 1.5,
    salad: 1
};

const addIngredient=(state , action)=>{
    const updatedAddIngsObject = {
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1
    };
    const updatedAddIngs = updateObject(state.ingredients,updatedAddIngsObject);
    const updatedAddState = {
        ingredients: updatedAddIngs,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    };
    return updateObject(state, updatedAddState);
};

const removeIngredient=(state , action)=>{
    const updatedRemIngsObject = {
        [action.ingredientName]: state.ingredients[action.ingredientName] - 1
    };
    const updatedRemIngs = updateObject(state.ingredients,updatedRemIngsObject);
    const updatedRemState = {
        ingredients: updatedRemIngs,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: true
    };
    return updateObject(state, updatedRemState);
};

const setIngredients=(state,action)=>{
    const updatedState = {
        ingredients: action.ingredients,
        totalPrice: 4,
        error: false,
        building: false
    };
    return updateObject(state, updatedState);
};

const burgerBuilderReducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return addIngredient(state,action);
        case actionTypes.REMOVE_INGREDIENT:
            return removeIngredient(state,action);
        case actionTypes.SET_INGREDIENTS:
            return setIngredients(state,action);
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return updateObject(state, {error: true});
        default:
            return state;
    }
};

export default burgerBuilderReducer;