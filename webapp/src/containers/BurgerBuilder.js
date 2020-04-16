import React, {Component} from "react";
import Auxiliary from "../hoc/Auxiliary";
import Burger from '../components/Burger/Burger'
import BuildControls from "../components/Burger/BuildControls/BuildControls";
import Modal from "../components/UI/Modal/Modal";
import OrderSummary from "../components/Burger/OrderSummary/OrderSummary";
import axios from './../axiosOrders'
import Spinner from "../components/UI/Spinner/Spinner";
import withErrorHandler from "../hoc/withErrorHandler/withErrorHandler";

const ingredientPrices = {
    cheese: 1,
    meat: 2,
    bacon: 1.5,
    salad: 1
};

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        showModal: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        axios.get('https://burger-builder-react-95245.firebaseio.com/ingredients.json')
            .then(response => {
                    const ingredients = response.data;
                    this.setState({
                        ingredients: ingredients
                    })
                }
            ).catch(error=>{
            this.setState({
                error: true
            })
        })
    }

    addIngredientHandler = (type) => {
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

    removeIngredientHandler = (type) => {
        let updatedCount = this.state.ingredients[type] - 1;
        let newPrice = this.state.totalPrice;
        const priceRemove = ingredientPrices[type];

        if (updatedCount >= 0)
            newPrice = newPrice - priceRemove;

        if (updatedCount <= 0)
            updatedCount = 0;

        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });

        this.updatePurchaseState(newPrice);
    };

    updatePurchaseState = (newPrice) => {
        this.setState({
            purchasable: newPrice > 4
        })

    };

    showModalHandler = () => {
        this.setState((prevState) => {
            return {
                showModal: !this.state.showModal
            }
        });
    };

    purchaseContinueHandler = () => {
        this.setState({
            loading: true
        });
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Kasiulka',
                address: {
                    street: 'Street 21',
                    city: 'Chorzow',
                    zipCode: '54-234',
                    country: 'Poland'
                },
                email: 'kasia@kasia.com'
            },
            deliveryMethod: 'fastest'
        };

        axios.post('/orders.json', order).then(response => {
            console.log(response);
            this.setState({
                loading: false,
                showModal: false
            });
        }).catch(error => {
                this.setState({
                    loading: false,
                    showModal: false
                });
            }
        );
    };

    render() {
        let orderSummary = null;
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let burger = this.state.error ? <p>Ingredients cant be loaded :(</p> : <Spinner/>;

        if (this.state.ingredients) {
            burger = (
                <React.Fragment>
                    <Burger
                        ingredients={this.state.ingredients}/>
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrice.toFixed(2)}
                        purchasable={this.state.purchasable}
                        showModal={this.showModalHandler}/>
                </React.Fragment>);

            orderSummary = (<OrderSummary
                ingredients={this.state.ingredients}
                cancel={this.showModalHandler}
                continue={this.purchaseContinueHandler}
                price={this.state.totalPrice.toFixed(2)}/>)
        };

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

export default withErrorHandler(BurgerBuilder, axios);