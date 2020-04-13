import React from "react";
import classes from "./BuildControls.module.css"
import BuildControl from "./BuildControl/BuildControl";

const controls=[
    {label: 'Salad', type: 'salad'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Meat', type: 'meat'},
];

const buildControls =(props)=>(
<div className={classes.BuildControls}>
    <p><strong>Current price : {props.price}{' '}$</strong></p>

    {controls.map(ctrl=>(
        <BuildControl
        label={ctrl.label}
        key={ctrl.type}
        added={()=>props.ingredientAdded(ctrl.type)}
        removed={()=>props.ingredientRemoved(ctrl.type)}
        disabled={props.disabled[ctrl.type]}
        />
    ))}

    <button className={classes.OrderButton} onClick={props.showModal} disabled={!props.purchasable}>ORDER NOW</button>
</div>
);


export default buildControls;