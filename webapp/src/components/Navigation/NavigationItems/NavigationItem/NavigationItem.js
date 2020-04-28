import React from "react";
import classes from './NavigationItem.module.css'
import {NavLink} from "react-router-dom";

const navigationItem =(props)=>(
        <li className={classes.NavigationItem}>
            <NavLink exact={props.exact} activeClassName={classes.active} to={props.path}>{props.label}</NavLink>
        </li>
);

export default navigationItem;