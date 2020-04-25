import React,{Component} from "react";
import classes from './ContactData.module.css'
import Button from "../../../components/UI/Button/Button";
import axios from "axios";

class ContactData extends Component{

    state={
      name: '',
      email: '',
      address:{
          street:'',
          postalCode:''
      },
        loading: false
    };

    orderHandler=(event)=>{
       event.preventDefault();
        this.setState({loading: true});
        // const order = {
        //     ingredients: this.props.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Kasiulka',
        //         address: {
        //             street: 'Street 21',
        //             city: 'Chorzow',
        //             zipCode: '54-234',
        //             country: 'Poland'
        //         },
        //         email: 'kasia@kasia.com'
        //     },
        //     deliveryMethod: 'fastest'
        // };
        //
        // axios.post('/orders.json', order).then(response => {
        //     console.log(response);
        //     this.setState({
        //         loading: false,
        //         showModal: false
        //     });
        // }).catch(error => {
        //         this.setState({
        //             loading: false,
        //             showModal: false
        //         });
        //     }
        // );
    };

    render() {
        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data: </h4>
                <form>
                    <input className={classes.Input} type='text' name='name' placeholder='Your Name'/>
                    <input className={classes.Input} type='email' name='email' placeholder='Your Email'/>
                    <input className={classes.Input} type='text' name='street' placeholder='Street'/>
                    <input className={classes.Input} type='text' name='postalCode' placeholder='Postal Code'/>
                    <Button name='Success' onClick={this.orderHandler}>Order</Button>
                </form>
            </div>
        );
    }
}

export default ContactData;