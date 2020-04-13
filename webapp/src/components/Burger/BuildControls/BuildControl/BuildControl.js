import React from "react";
import classes from "./BuildControl.module.css"

const buildControl =(props)=> {

    return(
    <div>
        <div className={classes.BuildControl}>
            <label className={classes.Label}>{props.label}</label>
            <button className={classes.Plus} onClick={props.added}>+</button>
            <button className={classes.Minus} onClick={props.removed} disabled={props.disabled}>-</button>
        </div>
    </div>
    )
};


export default buildControl;