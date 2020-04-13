import React from "react";
import classes from './NavigationItem.module.css'

const navigationItem =(props)=>(
        <li className={classes.NavigationItem}>
            <a href={props.path} className={props.active ? classes.active : null}>{props.label}</a>
        </li>
);

export default navigationItem;