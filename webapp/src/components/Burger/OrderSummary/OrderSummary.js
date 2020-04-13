import React from "react";
import Auxiliary from "../../../hoc/Auxiliary";
import classes from './OrderSummary.module.css'

const orderSummary =(props)=>{
    const ingredientSummary = Object.keys(props.ingredients).map(igKey => {
        return <li key={igKey}>
            <span style={{textTransform: 'capitalize'}}>{igKey}</span>:{' '}
            {props.ingredients[igKey]}
        </li>
    });


    return(
        <Auxiliary>
            <h3>Your Order:</h3>
            <p>A delicious burger with following ingredients: </p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Total price : <strong>{props.price}{' '}$</strong></p>
            <p>Continue to checkout?</p>
            <button className={[classes.Button, classes.Cancel].join(' ')}
                    onClick={props.cancel}>CANCEL
            </button>
            <button className={[classes.Button, classes.Continue].join(' ')}
                    onClick={props.continue}>CONTINUE
            </button>
        </Auxiliary>
    );
};


export default orderSummary;