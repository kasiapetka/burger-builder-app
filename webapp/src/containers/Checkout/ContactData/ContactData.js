import React, {Component} from "react";
import classes from './ContactData.module.css'
import Button from "../../../components/UI/Button/Button";
import axios from './../../../axiosOrders';
import Spinner from "../../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name',
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street',
                },
                value: ''
            },
            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'City',
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code',
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country',
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email',
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: ''
            }
        },
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,

        };

        axios.post('/orders.json', order).then(response => {
            this.setState({
                loading: false,
            });
            this.props.history.push('/')
        }).catch(error => {
                this.setState({
                    loading: false,
                });
            }
        );
    };

    render() {
        const loading = this.state.loading;
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
            form = <form>
                {
                    formElements.map(formEl => {
                        return <Input
                            key={formEl.id}
                            elementType={formEl.config.elementType}
                            elementConfig={formEl.config.elementConfig}
                            value={formEl.config.value}/>
                    })
                }
                <Button name='Success' onClick={this.orderHandler}>Order</Button>
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

export default withErrorHandler(ContactData, axios);