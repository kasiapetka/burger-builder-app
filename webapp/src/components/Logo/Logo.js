import React from "react";
import logoImg from '../../img/logo.png'
import classes from './Logo.module.css'

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={logoImg} alt='Logo'/>
    </div>
);

export default logo;