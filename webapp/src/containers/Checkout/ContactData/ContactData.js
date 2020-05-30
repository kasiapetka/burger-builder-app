import React, {Component} from "react";
import classes from './ContactData.module.css'
import Button from "../../../components/UI/Button/Button";
import axios from './../../../axiosOrders';
import Spinner from "../../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import Input from "../../../components/UI/Input/Input";
import {connect} from "react-redux";
import * as actionCreators from '../../../store/actions'

class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name',
                },
                value: '',
                validation:{
                    required: true
                },
                valid:false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street',
                },
                value: '',
                validation:{
                    required: true
                },
                valid:false,
                touched: false
            },
            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'City',
                },
                value: '',
                validation:{
                    required: true
                },
                valid:false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code',
                },
                value: '',
                validation:{
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid:false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country',
                },
                value: '',
                validation:{
                    required: true
                },
                valid:false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email',
                },
                value: '',
                validation:{
                    required: true
                },
                valid:false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                valid: true,
                validation:{},
            }
        },
        formIsValid: true
    };

    orderHandler = (event) => {
        event.preventDefault();
        const contactData = {};
        for(let formEl in this.state.orderForm){
            contactData[formEl] = this.state.orderForm[formEl].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            contactData: contactData
        };

        this.props.onPurchaseBurger(order, this.props.token);
    };

    handleChange = (event, inputId) => {
        const value = event.target.value;
        const form = {...this.state.orderForm};
        const formElement = {...form[inputId]};
        formElement.value = value;
        formElement.valid = this.checkValidity(formElement.value, formElement.validation);
        formElement.touched = true;
        form[inputId] = formElement;

        let formIsValid = true;
        for(let inputId in form){
            formIsValid = form[inputId].valid && formIsValid;
        }

        this.setState({
            orderForm: form,
            formIsValid: formIsValid
        })
    };

    checkValidity=(value, rules)=>{
        let isValid = true;

        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    };

    render() {
        const loading = this.props.loading;
        let form;
        const formElements = [];

        for (let key in this.state.orderForm) {
            formElements.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        if (loading) {
            form = <Spinner/>
        } else {
            form = <form onSubmit={this.orderHandler}>
                {
                    formElements.map(formEl => {
                        return <Input
                            key={formEl.id}
                            invalid={!formEl.config.valid}
                            shouldValidate={formEl.config.validation}
                            touched = {formEl.config.touched}
                            changed={(event)=>this.handleChange(event,formEl.id)}
                            elementType={formEl.config.elementType}
                            elementConfig={formEl.config.elementConfig}
                            value={formEl.config.value}/>
                    })
                }
                <Button type="submit" name='Success' disabled={!this.state.formIsValid}>Order</Button>
            </form>
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data: </h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return{
        ingredients: state.ingr.ingredients,
        totalPrice: state.ingr.totalPrice,
        loading: state.order.loading,
        token: state.auth.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
       onPurchaseBurger: (orderData, token) => dispatch(actionCreators.purchaseBurger(orderData,token))
    };
};

export default  connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData, axios));
